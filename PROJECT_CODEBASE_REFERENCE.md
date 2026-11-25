# Land2Land — Complete Project Codebase Reference

> Generated from the current Git-tracked project. It inventories every tracked file and directory and records statically detectable exports, imports, functions, callbacks, methods, constructors, and accessors. This is a structural/symbol reference, not a copy of source bodies or a runtime call graph.

## Scope and inventory

- Inventory date: 2026-11-25.
- Tracked files covered: **883** (exactly the paths returned by `git ls-files`, including this reference).
- TypeScript/JavaScript source modules parsed: **647**; parser diagnostics: **0**.
- Static function/callback declarations: **4,421**; methods, constructors, and accessors: **8**.
- File scope excludes ignored dependencies, build output, `.git`, runtime files, and untracked files. Git does not represent empty directories.
- Functions and callbacks are found with the TypeScript AST, including nested arrow/function expressions. Python/PHP/shell files are included in the file map; no function declarations were detected in the tracked Python/PHP scripts.
- All tracked files are listed below; source rows include static symbols, and binary/static rows include type and size. Secrets and source bodies are not copied.

## Project overview

Land2Land is a Next.js App Router marketplace for property and agricultural land in India. Its tracked code groups public discovery and editorial routes, buyer/agent/associate/builder/admin workspaces, API handlers, shared UI, persistence/auth/media/email utilities, static data, public assets, and maintenance scripts.

### Stack and commands

- **Framework:** Next.js 16 App Router, React 19, TypeScript.
- **UI:** Tailwind CSS 4, Radix UI, Lucide icons, reusable components in `components/`.
- **Services and libraries declared by project docs/dependencies:** MongoDB, custom server-side auth with bcrypt, ImageKit, Nodemailer/SMTP, optional Firebase/Google auth, Zod, React Hook Form, Recharts, Tiptap, and Vercel Analytics.
- **Package scripts:** `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`, and `pnpm clean-install` (the last removes the lockfile and installed modules before reinstalling).
- **TypeScript:** strict mode; `@/*` aliases the project root; JavaScript allowed; `noEmit` enabled.
- **Tests:** tracked test file `lib/link-validator.test.ts`; no test script in `package.json`.
- **Routing/configuration:** App Router conventions live under `app/`; `middleware.ts` and `next.config.mjs` implement shared request routing/configuration.

### Feature domains

- **Public marketplace:** property search/details/categories, land types, farms, locations, developers/projects, blogs/news, contact, services, tools, and legal pages.
- **Buyer workspace:** inquiries, messages, saved properties, profile, and settings.
- **Agent/associate workspaces:** dashboards, listings, leads, RERA requests, reviews, tickets, subscriptions, and rewards.
- **Builder workspace:** analytics, leads, messages, properties, profile, and settings.
- **Admin workspace:** catalogue/content management, users/roles, properties/reviews, leads/messages/tickets, SEO, homepage sections, imports/exports, subscriptions, and rewards.
- **API:** role-scoped and public Next.js route handlers; each exported HTTP handler is listed in the file table.

## Directory inventory

Recursive tracked-file counts by top-level entry:

| Top-level path | Tracked files |
|---|---:|
| `.gitignore` | 1 |
| `.htaccess` | 1 |
| `app/` | 374 |
| `components/` | 231 |
| `components.json` | 1 |
| `cr.md` | 1 |
| `data/` | 2 |
| `google2a84e53130347dd4.html` | 1 |
| `hooks/` | 7 |
| `info.php` | 1 |
| `LAND2LAND_ENHANCEMENTS.md` | 1 |
| `lib/` | 28 |
| `llms.txt` | 1 |
| `md.md` | 1 |
| `middleware.ts` | 1 |
| `next.config.mjs` | 1 |
| `package.json` | 1 |
| `postcss.config.mjs` | 1 |
| `PROJECT_CODEBASE_REFERENCE.md` | 1 |
| `property-detail.png` | 1 |
| `property-details-section.png` | 1 |
| `propety.json` | 1 |
| `public/` | 214 |
| `README.md` | 1 |
| `scripts/` | 4 |
| `styles/` | 2 |
| `tailwind.config.ts` | 1 |
| `test-db-connection.ts` | 1 |
| `tsconfig.json` | 1 |

Recursive tracked-file counts for all directories:

| Directory | Tracked files below it |
|---|---:|
| `app/` | 374 |
| `app/[slug]/` | 2 |
| `app/about/` | 3 |
| `app/account/` | 1 |
| `app/account/delete/` | 1 |
| `app/admin/` | 58 |
| `app/admin/agents/` | 2 |
| `app/admin/agents/[id]/` | 1 |
| `app/admin/amenities/` | 3 |
| `app/admin/amenities/[id]/` | 1 |
| `app/admin/amenities/[id]/edit/` | 1 |
| `app/admin/amenities/new/` | 1 |
| `app/admin/blog/` | 4 |
| `app/admin/blog/[id]/` | 1 |
| `app/admin/blog/[id]/edit/` | 1 |
| `app/admin/blog/graphql/` | 1 |
| `app/admin/blog/new/` | 1 |
| `app/admin/categories/` | 3 |
| `app/admin/categories/[id]/` | 1 |
| `app/admin/categories/[id]/edit/` | 1 |
| `app/admin/categories/new/` | 1 |
| `app/admin/contacts/` | 1 |
| `app/admin/dashboard/` | 1 |
| `app/admin/developers/` | 3 |
| `app/admin/developers/[id]/` | 1 |
| `app/admin/developers/[id]/edit/` | 1 |
| `app/admin/developers/new/` | 1 |
| `app/admin/facilities/` | 3 |
| `app/admin/facilities/[id]/` | 1 |
| `app/admin/facilities/[id]/edit/` | 1 |
| `app/admin/facilities/new/` | 1 |
| `app/admin/head-tags/` | 1 |
| `app/admin/homepage-sections/` | 3 |
| `app/admin/homepage-sections/[id]/` | 2 |
| `app/admin/import-export/` | 1 |
| `app/admin/leads/` | 1 |
| `app/admin/locations/` | 4 |
| `app/admin/locations/[id]/` | 1 |
| `app/admin/locations/[id]/edit/` | 1 |
| `app/admin/locations/new/` | 1 |
| `app/admin/login/` | 1 |
| `app/admin/messages/` | 1 |
| `app/admin/properties/` | 4 |
| `app/admin/properties/[id]/` | 1 |
| `app/admin/properties/[id]/edit/` | 1 |
| `app/admin/properties/new/` | 1 |
| `app/admin/properties/review/` | 1 |
| `app/admin/quotes/` | 1 |
| `app/admin/register/` | 1 |
| `app/admin/rera-requests/` | 2 |
| `app/admin/rera-requests/[id]/` | 1 |
| `app/admin/reviews/` | 1 |
| `app/admin/reward-center/` | 1 |
| `app/admin/rewards/` | 1 |
| `app/admin/seo/` | 5 |
| `app/admin/seo/pages/` | 3 |
| `app/admin/seo/pages/[id]/` | 1 |
| `app/admin/seo/pages/[id]/edit/` | 1 |
| `app/admin/seo/pages/new/` | 2 |
| `app/admin/states/` | 3 |
| `app/admin/states/[id]/` | 1 |
| `app/admin/states/[id]/edit/` | 1 |
| `app/admin/states/new/` | 1 |
| `app/admin/subscription-plans/` | 1 |
| `app/admin/tickets/` | 3 |
| `app/admin/tickets/[id]/` | 2 |
| `app/admin/tickets/[id]/reply/` | 1 |
| `app/admin/users/` | 1 |
| `app/agent/` | 16 |
| `app/agent/dashboard/` | 1 |
| `app/agent/leads/` | 1 |
| `app/agent/login/` | 1 |
| `app/agent/profile/` | 1 |
| `app/agent/properties/` | 3 |
| `app/agent/properties/[id]/` | 1 |
| `app/agent/properties/[id]/edit/` | 1 |
| `app/agent/properties/new/` | 1 |
| `app/agent/register/` | 1 |
| `app/agent/rera/` | 3 |
| `app/agent/rera/[id]/` | 1 |
| `app/agent/rera/new/` | 1 |
| `app/agent/reviews/` | 1 |
| `app/agent/subscription/` | 1 |
| `app/agent/tickets/` | 2 |
| `app/agent/tickets/[id]/` | 1 |
| `app/agreements/` | 4 |
| `app/agreements/buyer-advisory/` | 1 |
| `app/agreements/channel-partner/` | 1 |
| `app/agreements/enquiry-form-terms/` | 1 |
| `app/agreements/seller-mandate/` | 1 |
| `app/api/` | 140 |
| `app/api/admin/` | 68 |
| `app/api/admin/agents/` | 5 |
| `app/api/admin/agents/[id]/` | 3 |
| `app/api/admin/agents/[id]/credits/` | 1 |
| `app/api/admin/agents/[id]/subscription/` | 1 |
| `app/api/admin/agents/analytics/` | 1 |
| `app/api/admin/amenities/` | 2 |
| `app/api/admin/amenities/[id]/` | 1 |
| `app/api/admin/blog/` | 6 |
| `app/api/admin/blog/auto-link/` | 1 |
| `app/api/admin/blog/categories/` | 1 |
| `app/api/admin/blog/keywords/` | 1 |
| `app/api/admin/blog/posts/` | 2 |
| `app/api/admin/blog/posts/[id]/` | 1 |
| `app/api/admin/blog/tags/` | 1 |
| `app/api/admin/buyer-messages/` | 2 |
| `app/api/admin/buyer-messages/[id]/` | 1 |
| `app/api/admin/categories/` | 2 |
| `app/api/admin/categories/[id]/` | 1 |
| `app/api/admin/contacts/` | 1 |
| `app/api/admin/developers/` | 2 |
| `app/api/admin/developers/[id]/` | 1 |
| `app/api/admin/facilities/` | 2 |
| `app/api/admin/facilities/[id]/` | 1 |
| `app/api/admin/head-tags/` | 2 |
| `app/api/admin/head-tags/[id]/` | 1 |
| `app/api/admin/homepage-sections/` | 4 |
| `app/api/admin/homepage-sections/[id]/` | 2 |
| `app/api/admin/homepage-sections/[id]/properties/` | 1 |
| `app/api/admin/homepage-sections/initialize/` | 1 |
| `app/api/admin/import-export/` | 4 |
| `app/api/admin/import-export/export/` | 1 |
| `app/api/admin/import-export/import/` | 1 |
| `app/api/admin/import-export/samples/` | 1 |
| `app/api/admin/import-export/validate/` | 1 |
| `app/api/admin/leads/` | 4 |
| `app/api/admin/leads/[id]/` | 3 |
| `app/api/admin/leads/[id]/assign/` | 1 |
| `app/api/admin/leads/[id]/notes/` | 1 |
| `app/api/admin/locations/` | 2 |
| `app/api/admin/locations/[id]/` | 1 |
| `app/api/admin/news/` | 2 |
| `app/api/admin/news/[id]/` | 1 |
| `app/api/admin/properties/` | 5 |
| `app/api/admin/properties/[id]/` | 2 |
| `app/api/admin/properties/[id]/review/` | 1 |
| `app/api/admin/properties/regenerate-slugs/` | 1 |
| `app/api/admin/properties/review/` | 1 |
| `app/api/admin/quotes/` | 1 |
| `app/api/admin/rera-requests/` | 2 |
| `app/api/admin/rera-requests/[id]/` | 1 |
| `app/api/admin/reviews/` | 2 |
| `app/api/admin/reviews/[id]/` | 1 |
| `app/api/admin/reward-accounts/` | 1 |
| `app/api/admin/reward-redemptions/` | 1 |
| `app/api/admin/reward-settings/` | 1 |
| `app/api/admin/reward-submissions/` | 1 |
| `app/api/admin/reward-tasks/` | 2 |
| `app/api/admin/reward-tasks/[id]/` | 1 |
| `app/api/admin/seo/` | 3 |
| `app/api/admin/seo/pages/` | 2 |
| `app/api/admin/seo/pages/[id]/` | 1 |
| `app/api/admin/seo/stats/` | 1 |
| `app/api/admin/states/` | 2 |
| `app/api/admin/states/[id]/` | 1 |
| `app/api/admin/subscription-plans/` | 3 |
| `app/api/admin/subscription-plans/[id]/` | 1 |
| `app/api/admin/subscription-plans/initialize/` | 1 |
| `app/api/admin/tickets/` | 3 |
| `app/api/admin/tickets/[id]/` | 2 |
| `app/api/admin/tickets/[id]/reply/` | 1 |
| `app/api/admin/users/` | 1 |
| `app/api/agent/` | 12 |
| `app/api/agent/leads/` | 2 |
| `app/api/agent/leads/[id]/` | 1 |
| `app/api/agent/profile/` | 1 |
| `app/api/agent/properties/` | 2 |
| `app/api/agent/properties/[id]/` | 1 |
| `app/api/agent/rera-requests/` | 2 |
| `app/api/agent/rera-requests/[id]/` | 1 |
| `app/api/agent/subscription/` | 3 |
| `app/api/agent/subscription/checkout/` | 1 |
| `app/api/agent/subscription/plans/` | 1 |
| `app/api/agent/tickets/` | 2 |
| `app/api/agent/tickets/[id]/` | 1 |
| `app/api/agents/` | 1 |
| `app/api/associate/` | 13 |
| `app/api/associate/leads/` | 2 |
| `app/api/associate/leads/[id]/` | 1 |
| `app/api/associate/profile/` | 1 |
| `app/api/associate/properties/` | 2 |
| `app/api/associate/properties/[id]/` | 1 |
| `app/api/associate/redeem/` | 1 |
| `app/api/associate/rera-requests/` | 2 |
| `app/api/associate/rera-requests/[id]/` | 1 |
| `app/api/associate/reviews/` | 1 |
| `app/api/associate/reward-tasks/` | 1 |
| `app/api/associate/rewards/` | 1 |
| `app/api/associate/tickets/` | 2 |
| `app/api/associate/tickets/[id]/` | 1 |
| `app/api/associates/` | 1 |
| `app/api/auth/` | 8 |
| `app/api/auth/apple/` | 1 |
| `app/api/auth/buyer-quick-register/` | 1 |
| `app/api/auth/delete-account/` | 1 |
| `app/api/auth/google/` | 1 |
| `app/api/auth/login/` | 1 |
| `app/api/auth/logout/` | 1 |
| `app/api/auth/me/` | 1 |
| `app/api/auth/register/` | 1 |
| `app/api/blog/` | 1 |
| `app/api/blog/posts/` | 1 |
| `app/api/buyer/` | 3 |
| `app/api/buyer/inquiries/` | 1 |
| `app/api/buyer/messages/` | 2 |
| `app/api/buyer/messages/[id]/` | 1 |
| `app/api/buyer/messages/[id]/reply/` | 1 |
| `app/api/callback/` | 1 |
| `app/api/categories/` | 1 |
| `app/api/contact/` | 1 |
| `app/api/developers/` | 3 |
| `app/api/developers/[slug]/` | 2 |
| `app/api/developers/[slug]/projects/` | 1 |
| `app/api/enquiries/` | 1 |
| `app/api/head-tags/` | 1 |
| `app/api/homepage-sections/` | 2 |
| `app/api/homepage-sections-with-properties/` | 1 |
| `app/api/homepage-sections/[id]/` | 1 |
| `app/api/homepage-sections/[id]/properties/` | 1 |
| `app/api/imagekit-auth/` | 1 |
| `app/api/locations/` | 1 |
| `app/api/locations/[slug]/` | 1 |
| `app/api/news/` | 2 |
| `app/api/news/[slug]/` | 1 |
| `app/api/otp/` | 2 |
| `app/api/otp/send/` | 1 |
| `app/api/otp/verify/` | 1 |
| `app/api/properties/` | 4 |
| `app/api/properties/[id]/` | 2 |
| `app/api/properties/[id]/reviews/` | 1 |
| `app/api/properties/type-lookup/` | 1 |
| `app/api/properties/type-lookup/[slug]/` | 1 |
| `app/api/property-enquiry/` | 1 |
| `app/api/quote/` | 1 |
| `app/api/reports/` | 1 |
| `app/api/reviews/` | 1 |
| `app/api/reviews/[id]/` | 1 |
| `app/api/reviews/[id]/actions/` | 1 |
| `app/api/search/` | 1 |
| `app/api/search/voice/` | 1 |
| `app/api/sell-enquiry/` | 1 |
| `app/api/send-eoi/` | 1 |
| `app/api/states/` | 1 |
| `app/api/upload/` | 1 |
| `app/api/user/` | 1 |
| `app/api/user/profile/` | 1 |
| `app/api/well-known/` | 2 |
| `app/api/well-known/apple-app-site-association/` | 1 |
| `app/api/well-known/assetlinks/` | 1 |
| `app/area-converter/` | 2 |
| `app/associate/` | 18 |
| `app/associate/dashboard/` | 2 |
| `app/associate/leads/` | 1 |
| `app/associate/login/` | 1 |
| `app/associate/profile/` | 1 |
| `app/associate/properties/` | 3 |
| `app/associate/properties/[id]/` | 1 |
| `app/associate/properties/[id]/edit/` | 1 |
| `app/associate/properties/new/` | 1 |
| `app/associate/register/` | 1 |
| `app/associate/rera/` | 3 |
| `app/associate/rera/[id]/` | 1 |
| `app/associate/rera/new/` | 1 |
| `app/associate/reviews/` | 1 |
| `app/associate/rewards/` | 1 |
| `app/associate/subscription/` | 1 |
| `app/associate/tickets/` | 2 |
| `app/associate/tickets/[id]/` | 1 |
| `app/auth/` | 4 |
| `app/auth/login/` | 2 |
| `app/auth/register/` | 2 |
| `app/blog/` | 9 |
| `app/blog/[slug]/` | 3 |
| `app/blog/preview/` | 1 |
| `app/blog/preview/[slug]/` | 1 |
| `app/blogs/` | 7 |
| `app/blogs/[slug]/` | 3 |
| `app/builder/` | 8 |
| `app/builder/analytics/` | 1 |
| `app/builder/leads/` | 1 |
| `app/builder/messages/` | 1 |
| `app/builder/profile/` | 1 |
| `app/builder/properties/` | 1 |
| `app/builder/settings/` | 1 |
| `app/buy/` | 1 |
| `app/buyer/` | 8 |
| `app/buyer/inquiries/` | 1 |
| `app/buyer/messages/` | 1 |
| `app/buyer/profile/` | 1 |
| `app/buyer/saved-properties/` | 1 |
| `app/buyer/settings/` | 1 |
| `app/career/` | 2 |
| `app/contact/` | 3 |
| `app/cookie-policy/` | 1 |
| `app/dashboard/` | 2 |
| `app/developer/` | 2 |
| `app/developer/[slug]/` | 2 |
| `app/developers/` | 3 |
| `app/disclaimer/` | 1 |
| `app/farms/` | 1 |
| `app/favorites/` | 2 |
| `app/find-agent/` | 1 |
| `app/find-associate/` | 2 |
| `app/grievance-redressal/` | 1 |
| `app/gurugram-master-plan/` | 1 |
| `app/how-it-works/` | 2 |
| `app/investments/` | 2 |
| `app/land/` | 1 |
| `app/land/[type]/` | 1 |
| `app/location/` | 2 |
| `app/location/[slug]/` | 2 |
| `app/messages/` | 1 |
| `app/news/` | 5 |
| `app/news/[slug]/` | 2 |
| `app/office-space/` | 3 |
| `app/office-space/[slug]/` | 2 |
| `app/offline/` | 1 |
| `app/portfolio/` | 1 |
| `app/pricing/` | 2 |
| `app/privacy-policy/` | 1 |
| `app/properties/` | 19 |
| `app/properties/[id]/` | 4 |
| `app/properties/[id]/preview/` | 1 |
| `app/properties/[id]/reviews/` | 1 |
| `app/properties/category/` | 1 |
| `app/properties/category/[category]/` | 1 |
| `app/properties/commercial/` | 3 |
| `app/properties/commercial/[slug]/` | 2 |
| `app/properties/location/` | 1 |
| `app/properties/location/[state]/` | 1 |
| `app/properties/plots/` | 3 |
| `app/properties/plots/[slug]/` | 2 |
| `app/properties/residential/` | 3 |
| `app/properties/residential/[slug]/` | 2 |
| `app/properties/types/` | 1 |
| `app/properties/types/[type]/` | 1 |
| `app/property-management/` | 1 |
| `app/quote/` | 1 |
| `app/search/` | 2 |
| `app/sell/` | 2 |
| `app/services/` | 10 |
| `app/services/advisory/` | 1 |
| `app/services/after-sales/` | 1 |
| `app/services/builder-partnerships/` | 1 |
| `app/services/commercial/` | 1 |
| `app/services/home-loans/` | 1 |
| `app/services/investment/` | 1 |
| `app/services/legal/` | 1 |
| `app/services/nri/` | 1 |
| `app/site-map/` | 1 |
| `app/state-land-portals/` | 1 |
| `app/subscription/` | 1 |
| `app/sunteck-beach-residences/` | 1 |
| `app/terms-and-conditions/` | 1 |
| `app/tools/` | 2 |
| `app/tools/emi-calculator/` | 1 |
| `app/tools/qr-generator/` | 1 |
| `components/` | 231 |
| `components/account/` | 2 |
| `components/admin/` | 16 |
| `components/agent/` | 2 |
| `components/agreements/` | 1 |
| `components/associate/` | 4 |
| `components/auth/` | 3 |
| `components/blog/` | 8 |
| `components/blog/block-editor/` | 4 |
| `components/dashboard/` | 7 |
| `components/debug/` | 1 |
| `components/forms/` | 19 |
| `components/land/` | 2 |
| `components/layout/` | 13 |
| `components/location/` | 10 |
| `components/mobile/` | 9 |
| `components/property/` | 24 |
| `components/rera/` | 1 |
| `components/search/` | 1 |
| `components/sections/` | 43 |
| `components/seo/` | 1 |
| `components/services/` | 1 |
| `components/ui/` | 62 |
| `data/` | 2 |
| `hooks/` | 7 |
| `lib/` | 28 |
| `public/` | 214 |
| `public/banners/` | 27 |
| `public/icons/` | 4 |
| `public/images/` | 9 |
| `public/images/land/` | 7 |
| `public/img/` | 65 |
| `public/land-types/` | 7 |
| `public/locations/` | 8 |
| `public/regions/` | 6 |
| `public/testimonials/` | 4 |
| `public/videos/` | 8 |
| `scripts/` | 4 |
| `styles/` | 2 |

Root-level tracked files: **21**.

## Complete file and folder structure

Every path below is tracked in Git as of 2026-11-25. Empty directories are not included because Git does not track them.

```text
├── .gitignore
├── .htaccess
├── app/
│   ├── [slug]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── about/
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── account/
│   │   └── delete/
│   │       └── page.tsx
│   ├── admin/
│   │   ├── agents/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── amenities/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── graphql/
│   │   │   │   └── queries.ts
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── categories/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── contacts/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── developers/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── facilities/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── head-tags/
│   │   │   └── page.tsx
│   │   ├── homepage-sections/
│   │   │   ├── [id]/
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── import-export/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── leads/
│   │   │   └── page.tsx
│   │   ├── locations/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── messages/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── properties/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   └── review/
│   │   │       └── page.tsx
│   │   ├── quotes/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── rera-requests/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── reviews/
│   │   │   └── page.tsx
│   │   ├── reward-center/
│   │   │   └── page.tsx
│   │   ├── rewards/
│   │   │   └── page.tsx
│   │   ├── seo/
│   │   │   ├── loading.tsx
│   │   │   ├── page.tsx
│   │   │   └── pages/
│   │   │       ├── [id]/
│   │   │       │   └── edit/
│   │   │       │       └── page.tsx
│   │   │       └── new/
│   │   │           ├── loading.tsx
│   │   │           └── page.tsx
│   │   ├── states/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── subscription-plans/
│   │   │   └── page.tsx
│   │   ├── tickets/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── reply/
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   └── users/
│   │       └── page.tsx
│   ├── agent/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── leads/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── properties/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── rera/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── reviews/
│   │   │   └── page.tsx
│   │   ├── subscription/
│   │   │   └── page.tsx
│   │   └── tickets/
│   │       ├── [id]/
│   │       │   └── page.tsx
│   │       └── page.tsx
│   ├── agreements/
│   │   ├── buyer-advisory/
│   │   │   └── page.tsx
│   │   ├── channel-partner/
│   │   │   └── page.tsx
│   │   ├── enquiry-form-terms/
│   │   │   └── page.tsx
│   │   └── seller-mandate/
│   │       └── page.tsx
│   ├── api/
│   │   ├── admin/
│   │   │   ├── agents/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── credits/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── subscription/
│   │   │   │   │       └── route.ts
│   │   │   │   ├── analytics/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── amenities/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── blog/
│   │   │   │   ├── auto-link/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── categories/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── keywords/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── posts/
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   └── tags/
│   │   │   │       └── route.ts
│   │   │   ├── buyer-messages/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── categories/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── contacts/
│   │   │   │   └── route.ts
│   │   │   ├── developers/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── facilities/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── head-tags/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── homepage-sections/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── properties/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   ├── initialize/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── import-export/
│   │   │   │   ├── export/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── import/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── samples/
│   │   │   │   │   └── route.ts
│   │   │   │   └── validate/
│   │   │   │       └── route.ts
│   │   │   ├── leads/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── assign/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   ├── notes/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── locations/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── news/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── properties/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── review/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   ├── regenerate-slugs/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── review/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── quotes/
│   │   │   │   └── route.ts
│   │   │   ├── rera-requests/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── reviews/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── reward-accounts/
│   │   │   │   └── route.ts
│   │   │   ├── reward-redemptions/
│   │   │   │   └── route.ts
│   │   │   ├── reward-settings/
│   │   │   │   └── route.ts
│   │   │   ├── reward-submissions/
│   │   │   │   └── route.ts
│   │   │   ├── reward-tasks/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── seo/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   └── stats/
│   │   │   │       └── route.ts
│   │   │   ├── states/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── subscription-plans/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── initialize/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── tickets/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── reply/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── users/
│   │   │       └── route.ts
│   │   ├── agent/
│   │   │   ├── leads/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── profile/
│   │   │   │   └── route.ts
│   │   │   ├── properties/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── rera-requests/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── subscription/
│   │   │   │   ├── checkout/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── plans/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── tickets/
│   │   │       ├── [id]/
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   ├── agents/
│   │   │   └── route.ts
│   │   ├── associate/
│   │   │   ├── leads/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── profile/
│   │   │   │   └── route.ts
│   │   │   ├── properties/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── redeem/
│   │   │   │   └── route.ts
│   │   │   ├── rera-requests/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── reviews/
│   │   │   │   └── route.ts
│   │   │   ├── reward-tasks/
│   │   │   │   └── route.ts
│   │   │   ├── rewards/
│   │   │   │   └── route.ts
│   │   │   └── tickets/
│   │   │       ├── [id]/
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   ├── associates/
│   │   │   └── route.ts
│   │   ├── auth/
│   │   │   ├── apple/
│   │   │   │   └── route.ts
│   │   │   ├── buyer-quick-register/
│   │   │   │   └── route.ts
│   │   │   ├── delete-account/
│   │   │   │   └── route.ts
│   │   │   ├── google/
│   │   │   │   └── route.ts
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   ├── me/
│   │   │   │   └── route.ts
│   │   │   └── register/
│   │   │       └── route.ts
│   │   ├── blog/
│   │   │   └── posts/
│   │   │       └── route.ts
│   │   ├── buyer/
│   │   │   ├── inquiries/
│   │   │   │   └── route.ts
│   │   │   └── messages/
│   │   │       ├── [id]/
│   │   │       │   └── reply/
│   │   │       │       └── route.ts
│   │   │       └── route.ts
│   │   ├── callback/
│   │   │   └── route.ts
│   │   ├── categories/
│   │   │   └── route.ts
│   │   ├── contact/
│   │   │   └── route.ts
│   │   ├── developers/
│   │   │   ├── [slug]/
│   │   │   │   ├── projects/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── enquiries/
│   │   │   └── route.ts
│   │   ├── head-tags/
│   │   │   └── route.ts
│   │   ├── homepage-sections/
│   │   │   ├── [id]/
│   │   │   │   └── properties/
│   │   │   │       └── route.ts
│   │   │   └── route.ts
│   │   ├── homepage-sections-with-properties/
│   │   │   └── route.ts
│   │   ├── imagekit-auth/
│   │   │   └── route.ts
│   │   ├── locations/
│   │   │   └── [slug]/
│   │   │       └── route.ts
│   │   ├── news/
│   │   │   ├── [slug]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── otp/
│   │   │   ├── send/
│   │   │   │   └── route.ts
│   │   │   └── verify/
│   │   │       └── route.ts
│   │   ├── properties/
│   │   │   ├── [id]/
│   │   │   │   ├── reviews/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── route.ts
│   │   │   └── type-lookup/
│   │   │       └── [slug]/
│   │   │           └── route.ts
│   │   ├── property-enquiry/
│   │   │   └── route.ts
│   │   ├── quote/
│   │   │   └── route.ts
│   │   ├── reports/
│   │   │   └── route.ts
│   │   ├── reviews/
│   │   │   └── [id]/
│   │   │       └── actions/
│   │   │           └── route.ts
│   │   ├── search/
│   │   │   └── voice/
│   │   │       └── route.ts
│   │   ├── sell-enquiry/
│   │   │   └── route.ts
│   │   ├── send-eoi/
│   │   │   └── route.ts
│   │   ├── states/
│   │   │   └── route.ts
│   │   ├── upload/
│   │   │   └── route.ts
│   │   ├── user/
│   │   │   └── profile/
│   │   │       └── route.ts
│   │   └── well-known/
│   │       ├── apple-app-site-association/
│   │       │   └── route.ts
│   │       └── assetlinks/
│   │           └── route.ts
│   ├── area-converter/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── associate/
│   │   ├── dashboard/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── leads/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── properties/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── rera/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── reviews/
│   │   │   └── page.tsx
│   │   ├── rewards/
│   │   │   └── page.tsx
│   │   ├── subscription/
│   │   │   └── page.tsx
│   │   └── tickets/
│   │       ├── [id]/
│   │       │   └── page.tsx
│   │       └── page.tsx
│   ├── auth/
│   │   ├── login/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   └── register/
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── blog/
│   │   ├── _actions.ts
│   │   ├── _components.tsx
│   │   ├── [slug]/
│   │   │   ├── _blog-detail-components.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── page.tsx
│   │   └── preview/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── blogs/
│   │   ├── _actions.ts
│   │   ├── [slug]/
│   │   │   ├── _blog-detail-components.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── builder/
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── leads/
│   │   │   └── page.tsx
│   │   ├── messages/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── properties/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── buy/
│   │   └── page.tsx
│   ├── buyer/
│   │   ├── inquiries/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── messages/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── saved-properties/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── career/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── contact/
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── cookie-policy/
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── developer/
│   │   └── [slug]/
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── developers/
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── disclaimer/
│   │   └── page.tsx
│   ├── farms/
│   │   └── page.tsx
│   ├── favorites/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── find-agent/
│   │   └── page.tsx
│   ├── find-associate/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── grievance-redressal/
│   │   └── page.tsx
│   ├── gurugram-master-plan/
│   │   └── page.tsx
│   ├── how-it-works/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── investments/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── land/
│   │   └── [type]/
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── location/
│   │   └── [slug]/
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── manifest.ts
│   ├── messages/
│   │   └── page.tsx
│   ├── news/
│   │   ├── [slug]/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── office-space/
│   │   ├── [slug]/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── offline/
│   │   └── page.tsx
│   ├── page.tsx
│   ├── portfolio/
│   │   └── page.tsx
│   ├── pricing/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── properties/
│   │   ├── [id]/
│   │   │   ├── loading.tsx
│   │   │   ├── page.tsx
│   │   │   ├── preview/
│   │   │   │   └── page.tsx
│   │   │   └── reviews/
│   │   │       └── page.tsx
│   │   ├── category/
│   │   │   └── [category]/
│   │   │       └── page.tsx
│   │   ├── commercial/
│   │   │   ├── [slug]/
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── location/
│   │   │   └── [state]/
│   │   │       └── page.tsx
│   │   ├── page.tsx
│   │   ├── plots/
│   │   │   ├── [slug]/
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── residential/
│   │   │   ├── [slug]/
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── types/
│   │       └── [type]/
│   │           └── page.tsx
│   ├── property-management/
│   │   └── page.tsx
│   ├── quote/
│   │   └── page.tsx
│   ├── robots.ts
│   ├── search/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── sell/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── services/
│   │   ├── advisory/
│   │   │   └── page.tsx
│   │   ├── after-sales/
│   │   │   └── page.tsx
│   │   ├── builder-partnerships/
│   │   │   └── page.tsx
│   │   ├── commercial/
│   │   │   └── page.tsx
│   │   ├── home-loans/
│   │   │   └── page.tsx
│   │   ├── investment/
│   │   │   └── page.tsx
│   │   ├── legal/
│   │   │   └── page.tsx
│   │   ├── loading.tsx
│   │   ├── nri/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── site-map/
│   │   └── page.tsx
│   ├── sitemap.ts
│   ├── state-land-portals/
│   │   └── page.tsx
│   ├── subscription/
│   │   └── page.tsx
│   ├── sunteck-beach-residences/
│   │   └── page.tsx
│   ├── terms-and-conditions/
│   │   └── page.tsx
│   ├── test-page.tsx
│   └── tools/
│       ├── emi-calculator/
│       │   └── page.tsx
│       └── qr-generator/
│           └── page.tsx
├── components/
│   ├── account/
│   │   ├── delete-account-section.tsx
│   │   └── profile-image-upload.tsx
│   ├── admin/
│   │   ├── admin-nav.tsx
│   │   ├── agent-detail-page.tsx
│   │   ├── agent-management-page.tsx
│   │   ├── agent-subscription-analytics.tsx
│   │   ├── blog-post-form.tsx
│   │   ├── blog-posts-list.tsx
│   │   ├── buyer-messages-client.tsx
│   │   ├── contacts-list.tsx
│   │   ├── import-export-dialog.tsx
│   │   ├── leads-list.tsx
│   │   ├── property-filters.tsx
│   │   ├── property-review-card.tsx
│   │   ├── quotes-list.tsx
│   │   ├── section-property-editor.tsx
│   │   ├── subscription-plan-management-page.tsx
│   │   └── wordpress-blog-editor.tsx
│   ├── agent/
│   │   ├── agent-dashboard-nav.tsx
│   │   └── leads-list.tsx
│   ├── agreements/
│   │   └── agreement-layout.tsx
│   ├── associate/
│   │   ├── agent-subscription-page.tsx
│   │   ├── agent-subscription-summary-card.tsx
│   │   ├── associate-dashboard-nav.tsx
│   │   └── leads-list.tsx
│   ├── auth/
│   │   ├── apple-sign-in-button.tsx
│   │   ├── google-sign-in-button.tsx
│   │   └── list-land-promo.tsx
│   ├── blog/
│   │   ├── block-editor/
│   │   │   ├── editor-canvas.tsx
│   │   │   ├── floating-toolbar.tsx
│   │   │   ├── index.tsx
│   │   │   └── sidebar-inspector.tsx
│   │   ├── blog-grid.tsx
│   │   ├── editor-toolbar.tsx
│   │   ├── rich-text-editor.tsx
│   │   └── table-of-contents.tsx
│   ├── dashboard/
│   │   ├── dashboard-bottom-nav.tsx
│   │   ├── dashboard-header.tsx
│   │   ├── dashboard-layout-wrapper.tsx
│   │   ├── dashboard-nav.tsx
│   │   ├── dashboard-sidebar.tsx
│   │   ├── page-header.tsx
│   │   └── unified-sidebar.tsx
│   ├── debug/
│   │   └── LinkValidatorDebug.tsx
│   ├── forms/
│   │   ├── admin-login-form.tsx
│   │   ├── admin-register-form.tsx
│   │   ├── agent-login-form.tsx
│   │   ├── agent-register-form.tsx
│   │   ├── agreement-checkbox.tsx
│   │   ├── associate-login-form.tsx
│   │   ├── associate-register-form.tsx
│   │   ├── contact-form.tsx
│   │   ├── document-upload-field.tsx
│   │   ├── login-form.tsx
│   │   ├── property-form-multistep.tsx
│   │   ├── property-form-office-space.tsx
│   │   ├── property-form-step-1.tsx
│   │   ├── property-form-step-2.tsx
│   │   ├── property-form-step-3.tsx
│   │   ├── property-form-step-4.tsx
│   │   ├── property-form-wrapper.tsx
│   │   ├── quote-form.tsx
│   │   └── register-form.tsx
│   ├── land/
│   │   ├── category-faqs.tsx
│   │   └── land-type-listings.tsx
│   ├── layout/
│   │   ├── bottom-nav.tsx
│   │   ├── custom-head-tags.tsx
│   │   ├── footer.tsx
│   │   ├── frontend-layout.tsx
│   │   ├── head-tags-injector.tsx
│   │   ├── header-search.tsx
│   │   ├── header.tsx
│   │   ├── mega-menu-header.tsx
│   │   ├── navigation-progress.tsx
│   │   ├── page-transition.tsx
│   │   ├── product-mega-menu-content.tsx
│   │   ├── protected-route.tsx
│   │   └── route-prefetcher.tsx
│   ├── location/
│   │   ├── connectivity-section.tsx
│   │   ├── faq-section.tsx
│   │   ├── featured-projects-section.tsx
│   │   ├── index.ts
│   │   ├── location-filter-pills.tsx
│   │   ├── location-rich-hero.tsx
│   │   ├── nearby-infrastructure-section.tsx
│   │   ├── price-trends-section.tsx
│   │   ├── sector-breakdown-section.tsx
│   │   └── why-premium-section.tsx
│   ├── mobile/
│   │   ├── android-app-download-prompt.tsx
│   │   ├── hide-in-ios-app.tsx
│   │   ├── median-app-header.tsx
│   │   ├── median-bridge.tsx
│   │   ├── median-home-page.tsx
│   │   ├── median-popular-locations.tsx
│   │   ├── median-property-feed.tsx
│   │   ├── onesignal-web-push.tsx
│   │   └── pull-to-refresh.tsx
│   ├── property/
│   │   ├── brochure-download.tsx
│   │   ├── developer-projects.tsx
│   │   ├── enquiry-form.tsx
│   │   ├── floor-plan-tabs.tsx
│   │   ├── hero-banner.tsx
│   │   ├── index.ts
│   │   ├── listing-under-review.tsx
│   │   ├── location-connectivity.tsx
│   │   ├── location-hero.tsx
│   │   ├── luxury-property-card.tsx
│   │   ├── master-plan-section.tsx
│   │   ├── office-space-detail-client.tsx
│   │   ├── office-space-details.tsx
│   │   ├── phone-verification.tsx
│   │   ├── project-highlights.tsx
│   │   ├── property-card.tsx
│   │   ├── property-detail-client.tsx
│   │   ├── property-faq.tsx
│   │   ├── property-reviews.tsx
│   │   ├── property-skeleton.tsx
│   │   ├── report-content-dialog.tsx
│   │   ├── special-section.tsx
│   │   ├── units-section.tsx
│   │   └── verification-scorecard.tsx
│   ├── rera/
│   │   └── rera-status-badge.tsx
│   ├── search/
│   │   └── search-content.tsx
│   ├── sections/
│   │   ├── advanced-search.tsx
│   │   ├── banner-image.tsx
│   │   ├── banner-slider.tsx
│   │   ├── categories.tsx
│   │   ├── category-section.tsx
│   │   ├── cta.tsx
│   │   ├── dynamic-sections.tsx
│   │   ├── faqs.tsx
│   │   ├── farm-testimonials.tsx
│   │   ├── featured-developers.tsx
│   │   ├── featured-listings.tsx
│   │   ├── featured-office-spaces.tsx
│   │   ├── featured-video-properties.tsx
│   │   ├── handpicked-selections.tsx
│   │   ├── hero.tsx
│   │   ├── how-it-works.tsx
│   │   ├── investment-opportunities.tsx
│   │   ├── land-types-browse.tsx
│   │   ├── list-your-land.tsx
│   │   ├── luxury-showcase.tsx
│   │   ├── new-properties.tsx
│   │   ├── popular-locations.tsx
│   │   ├── popular-regions.tsx
│   │   ├── popular-states.tsx
│   │   ├── promo-banners.tsx
│   │   ├── property-types.tsx
│   │   ├── recently-viewed.tsx
│   │   ├── recommended-properties.tsx
│   │   ├── recommended-property.tsx
│   │   ├── search-map-promo.tsx
│   │   ├── seller-roadblocks.tsx
│   │   ├── services.tsx
│   │   ├── state-documents.tsx
│   │   ├── state-portal-finder.tsx
│   │   ├── stats-bar.tsx
│   │   ├── testimonials.tsx
│   │   ├── trending-land-properties.tsx
│   │   ├── trending-locations.tsx
│   │   ├── trending-tabs-section.tsx
│   │   ├── unit-converter-promo.tsx
│   │   ├── verified-properties.tsx
│   │   ├── why-choose-us.tsx
│   │   └── youtube-facade.tsx
│   ├── seo/
│   │   └── breadcrumb-json-ld.tsx
│   ├── services/
│   │   └── service-enquiry-form.tsx
│   ├── theme-provider.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button-group.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── combo-select.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── empty.tsx
│       ├── field.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-group.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── item.tsx
│       ├── kbd.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── popup-confirm.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── spinner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast-provider.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       ├── use-mobile.tsx
│       ├── use-toast.ts
│       ├── user-avatar.tsx
│       └── whatsapp-button.tsx
├── components.json
├── cr.md
├── data/
│   ├── golf-course-road-properties.json
│   └── location-content.ts
├── google2a84e53130347dd4.html
├── hooks/
│   ├── use-geolocation.ts
│   ├── use-mobile.ts
│   ├── use-mobile.tsx
│   ├── use-recently-viewed.ts
│   ├── use-toast.ts
│   ├── use-voice-search.ts
│   └── useValidateLink.ts
├── info.php
├── LAND2LAND_ENHANCEMENTS.md
├── lib/
│   ├── agent-subscriptions.ts
│   ├── agreement-links.ts
│   ├── api-client.ts
│   ├── auth.ts
│   ├── blog-auto-link.ts
│   ├── category-faqs.ts
│   ├── db.ts
│   ├── email.ts
│   ├── firebase.ts
│   ├── imagekit.ts
│   ├── import-export.ts
│   ├── land-types-content.ts
│   ├── link-validator.test.ts
│   ├── link-validator.ts
│   ├── median-server.ts
│   ├── median.ts
│   ├── models.ts
│   ├── modern-polyfill.js
│   ├── mongodb.ts
│   ├── otp.ts
│   ├── reward-system.ts
│   ├── schema-markup-generator.ts
│   ├── schemas.ts
│   ├── session-token.ts
│   ├── social-auth.ts
│   ├── utils-api.ts
│   ├── utils-db.ts
│   └── utils.ts
├── llms.txt
├── md.md
├── middleware.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── PROJECT_CODEBASE_REFERENCE.md
├── property-detail.png
├── property-details-section.png
├── propety.json
├── public/
│   ├── apple-icon.png
│   ├── apple-touch-icon-median.png
│   ├── apple-touch-icon.png
│   ├── banner-agricultural.webp
│   ├── banner-all.webp
│   ├── banner-commercial.webp
│   ├── banner-farmland.webp
│   ├── banner-industrial.webp
│   ├── banner-residential.webp
│   ├── banner-slide-1.png
│   ├── banner-slide-2.png
│   ├── banner-slide-3.png
│   ├── banner-slide-4.png
│   ├── banners/
│   │   ├── banner-agricultural.png
│   │   ├── banner-agricultural.webp
│   │   ├── banner-all.png
│   │   ├── banner-all.webp
│   │   ├── banner-commercial.png
│   │   ├── banner-commercial.webp
│   │   ├── banner-farmland.png
│   │   ├── banner-farmland.webp
│   │   ├── banner-industrial.png
│   │   ├── banner-industrial.webp
│   │   ├── banner-residential.png
│   │   ├── banner-residential.webp
│   │   ├── home-mob-banner-1.jpg
│   │   ├── home-mob-banner-1.webp
│   │   ├── home-mob-banner-2.jpg
│   │   ├── home-mob-banner-2.webp
│   │   ├── home-mob-banner-3.jpg
│   │   ├── home-mob-banner-3.webp
│   │   ├── home-mob-banner-4.jpg
│   │   ├── home-mob-banner-4.webp
│   │   ├── home-mob-banner-5.webp
│   │   ├── home-mob-banner-6.webp
│   │   ├── home-mob-banner-7.webp
│   │   ├── land-banner-1.png
│   │   ├── land-banner-2.png
│   │   ├── land-banner-3.png
│   │   └── land-banner-4.png
│   ├── blog-banner.jpg
│   ├── cozy-family-house.png
│   ├── dwarka-expressway-gurugram-modern-properties.jpg
│   ├── executive-apartment-interior-luxury.jpg
│   ├── fav.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-64x64.png
│   ├── favicon.ico
│   ├── golf-course-extension-road-properties.jpg
│   ├── golf-course-road-gurugram-luxury-properties.jpg
│   ├── google2a84e53130347dd4.html
│   ├── google6f4a1e619e90c33a.html
│   ├── googlec8f150c9f14d99a9.html
│   ├── home-banner-1.jpg
│   ├── home-banner-1.webp
│   ├── home-banner-2.jpg
│   ├── home-banner-2.webp
│   ├── home-banner-3.jpg
│   ├── home-banner-3.webp
│   ├── home-banner-4.jpg
│   ├── home-banner-4.webp
│   ├── home-banner-5.webp
│   ├── home-banner-6.webp
│   ├── home-banner-7.webp
│   ├── icon-dark-32x32.png
│   ├── icon-light-32x32.png
│   ├── icon.svg
│   ├── icons/
│   │   ├── icon-192.jpeg
│   │   ├── icon-192.png
│   │   ├── icon-512.jpeg
│   │   └── icon-512.png
│   ├── images/
│   │   ├── fav.png
│   │   ├── land/
│   │   │   ├── abadi-hero.png
│   │   │   ├── agricultural-hero.png
│   │   │   ├── commercial-hero.png
│   │   │   ├── farmland-hero.png
│   │   │   ├── industrial-hero.png
│   │   │   ├── residential-hero.png
│   │   │   └── vacant-hero.png
│   │   └── logo.png
│   ├── img/
│   │   ├── img215.jpg
│   │   ├── img228.jpg
│   │   ├── img232.jpg
│   │   ├── img238.jpg
│   │   ├── img241.jpg
│   │   ├── img256.jpg
│   │   ├── img288.jpg
│   │   ├── img291.jpg
│   │   ├── img294.jpg
│   │   ├── img351.jpg
│   │   ├── img359.jpg
│   │   ├── img385.jpg
│   │   ├── img388.jpg
│   │   ├── img389.jpg
│   │   ├── img390.jpg
│   │   ├── img394.jpg
│   │   ├── img397.jpg
│   │   ├── img400.jpg
│   │   ├── img403.jpg
│   │   ├── img404.jpg
│   │   ├── img408.jpg
│   │   ├── img411.jpg
│   │   ├── img419.jpg
│   │   ├── img431.jpg
│   │   ├── img441.jpg
│   │   ├── img442.jpg
│   │   ├── img443.jpg
│   │   ├── img444.jpg
│   │   ├── img461.jpg
│   │   ├── img463.jpg
│   │   ├── img469.jpg
│   │   ├── img472.jpg
│   │   ├── img478.jpg
│   │   ├── img482.jpg
│   │   ├── img483.jpg
│   │   ├── img484.jpg
│   │   ├── img491.jpg
│   │   ├── img492.jpg
│   │   ├── img495.jpg
│   │   ├── img498.jpg
│   │   ├── img501.jpg
│   │   ├── img504.jpg
│   │   ├── img507.jpg
│   │   ├── img510.jpg
│   │   ├── img513.jpg
│   │   ├── img517.jpg
│   │   ├── img519.jpg
│   │   ├── img522.jpg
│   │   ├── img523.jpg
│   │   ├── img527.jpg
│   │   ├── img531.jpg
│   │   ├── img534.jpg
│   │   ├── img537.jpg
│   │   ├── img540.jpg
│   │   ├── img541.jpg
│   │   ├── img609.jpg
│   │   ├── img677.jpg
│   │   ├── img747.jpg
│   │   ├── img817.jpg
│   │   ├── img853.jpg
│   │   ├── img860.jpg
│   │   ├── img863.jpg
│   │   ├── img866.jpg
│   │   ├── img869.jpg
│   │   └── img9.jpg
│   ├── indian-businessman-portrait.png
│   ├── indian-businesswoman-portrait.png
│   ├── land-plot-aerial-view.jpg
│   ├── land-types/
│   │   ├── abadi.png
│   │   ├── agricultural.png
│   │   ├── commercial.png
│   │   ├── farmland.png
│   │   ├── industrial.png
│   │   ├── na-plot.png
│   │   └── residential.png
│   ├── llms.txt
│   ├── locations/
│   │   ├── dwarka-expressway.jpg
│   │   ├── golf-course-extension.jpg
│   │   ├── golf-course-road.jpg
│   │   ├── manesar.jpg
│   │   ├── new-gurgaon.jpg
│   │   ├── nh-48.jpg
│   │   ├── sohna.jpg
│   │   └── southern-peripheral-road.jpg
│   ├── logo.png
│   ├── luxury-modern-real-estate-property-aerial-view-wit.jpg
│   ├── luxury-penthouse-interior-modern-design.jpg
│   ├── luxury-penthouse-interior.png
│   ├── modern-apartment-living.png
│   ├── modern-city-skyline.png
│   ├── modern-luxury-property-aerial-view.jpg
│   ├── modern-luxury-property-exterior-sunset.jpg
│   ├── modern-luxury-villa-exterior-pool.jpg
│   ├── modern-luxury-villa.png
│   ├── modern-office-building.png
│   ├── modern-residential-apartment.png
│   ├── new-gurgaon-properties-development.jpg
│   ├── new-slide-1.png
│   ├── new-slide-2.png
│   ├── new-slide-3.png
│   ├── new-slide-4.png
│   ├── nh-48-highway-properties-gurugram.jpg
│   ├── og-image.png
│   ├── OneSignalSDKWorker.js
│   ├── open-book-knowledge.png
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   ├── placeholder.svg
│   ├── professional-indian-business-executive-portrait.jpg
│   ├── regions/
│   │   ├── haryana.png
│   │   ├── maharashtra.png
│   │   ├── mp.png
│   │   ├── punjab.png
│   │   ├── rajasthan.png
│   │   └── up.png
│   ├── sohna-road-gurugram-properties.jpg
│   ├── southern-peripheral-road-gurugram-properties.jpg
│   ├── testimonials/
│   │   ├── 1.png
│   │   ├── 2.png
│   │   ├── 3.png
│   │   └── 4.png
│   ├── videos/
│   │   ├── ashiana-aaroham.mp4
│   │   ├── elie-saab.mp4
│   │   ├── gic-manesar.mp4
│   │   ├── signature-sarvam.mp4
│   │   ├── silverglades-the-legacy-sector-63a-gurgaon.mp4
│   │   ├── sobha-crescent-sector-63a-gurgaon.mp4
│   │   ├── sunteck-oceonpolis.mp4
│   │   └── tarc-Ishva.mp4
│   ├── village-cta-bg.png
│   └── village-fields-texture.png
├── README.md
├── scripts/
│   ├── find-agent-refs.py
│   ├── find-agent-substrings.py
│   ├── migrate-to-land2land.mjs
│   └── replace-agent-with-associate.py
├── styles/
│   ├── blog-content.css
│   └── globals.css
├── tailwind.config.ts
├── test-db-connection.ts
└── tsconfig.json
```

## Complete file-by-file reference

One row per tracked file. Source rows include exported declarations, up to 12 direct import specifiers (with a total when there are more), and every statically detectable function-like declaration with its source line. A source row without a function list has no detected function-like AST nodes. Other files include file type, byte size, and inferred role.

| File | Type / size / lines | Role, exports, imports, functions, and methods |
|---|---|---|
| `.gitignore` | Extensionless/config file · 449 bytes | Project configuration, source, or static asset |
| `.htaccess` | Extensionless/config file · 1,138 bytes | Project configuration, source, or static asset |
| `app/[slug]/layout.tsx` | TSX / React · 6,933 bytes · 225 lines | Next.js App Router layout and route metadata<br>exports: function generateMetadata, default function SlugLayout<br>imports: next, @/data/location-content<br>functions/methods (6): L51 function async generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata>; L107 function generateFAQSchema(slug: string); L117 callback (inline callback)(faq); L129 function generateRealEstateSchema(slug: string); L154 function generateBreadcrumbSchema(slug: string); L184 function async SlugLayout({ children, params, }: { children: React.ReactNode params: Promise<{ slug: string }> }) |
| `app/[slug]/page.tsx` | TSX / React · 29,771 bytes · 723 lines | Next.js App Router page and route implementation<br>exports: default function SlugPage<br>imports: react, next/navigation, next/link, lucide-react, @/components/ui/button, @/components/ui/skeleton, @/lib/utils, @/components/property/location-hero, @/components/property/luxury-property-card, @/components/ui/whatsapp-button, @/components/layout/header, @/components/layout/footer, … (15 total)<br>functions/methods (29): L39 callback fetcher(url: string); L39 callback (inline callback)(res); L164 function SlugPage(); L181 callback (inline callback)(); L187 callback (inline callback)(); L198 callback (inline callback)(); L201 callback async fetchLocationData(); L222 callback buildTypeQueryString(); L230 callback (inline callback)(v); L237 callback (inline callback)(c); L257 callback (inline callback)(); L327 callback (inline callback)(e); L335 callback (inline callback)(opt); L345 callback (inline callback)(); L357 callback (inline callback)(); L375 callback (inline callback)(_, i); L387 callback (inline callback)(property); L393 callback (inline callback)(property); L441 callback (inline callback)(); L454 callback (inline callback)(_, i); L464 callback (inline callback)(); L482 callback (inline callback)(); L598 callback (inline callback)(e); L605 callback (inline callback)(opt); L615 callback (inline callback)(); L629 callback (inline callback)(); L652 callback (inline callback)(_, i); L669 callback (inline callback)(property); L675 callback (inline callback)(property) |
| `app/about/layout.tsx` | TSX / React · 321 bytes · 5 lines | Next.js App Router layout and route metadata<br>exports: default function AboutLayout<br>imports: @/components/seo/breadcrumb-json-ld<br>functions/methods (1): L3 function AboutLayout({ children }: { children: React.ReactNode }) |
| `app/about/loading.tsx` | TSX / React · 571 bytes · 15 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (1): L1 function Loading() |
| `app/about/page.tsx` | TSX / React · 20,299 bytes · 383 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AboutPage<br>imports: next, next/script, lucide-react, @/components/layout/header, @/components/layout/footer, @/lib/schema-markup-generator<br>functions/methods (9): L68 function AboutPage(); L85 callback (inline callback)(schema, index); L143 callback (inline callback)(item, idx); L243 callback (inline callback)(item, idx); L259 callback (inline callback)(value, idx); L287 callback (inline callback)(item, idx); L305 callback (inline callback)(item, idx); L323 callback (inline callback)(item, idx); L350 callback (inline callback)(item, idx) |
| `app/account/delete/page.tsx` | TSX / React · 4,838 bytes · 101 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function DeleteAccountInfoPage<br>imports: next, next/link, lucide-react<br>functions/methods (1): L13 function DeleteAccountInfoPage() |
| `app/admin/agents/[id]/page.tsx` | TSX / React · 445 bytes · 12 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AdminAgentDetailsPage<br>imports: next, @/components/admin/agent-detail-page<br>functions/methods (1): L9 function async AdminAgentDetailsPage({ params }: { params: Promise<{ id: string }> }) |
| `app/admin/agents/page.tsx` | TSX / React · 366 bytes · 11 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AdminAgentsPage<br>imports: next, @/components/admin/agent-management-page<br>functions/methods (1): L9 function AdminAgentsPage() |
| `app/admin/amenities/[id]/edit/page.tsx` | TSX / React · 3,663 bytes · 121 lines | Next.js App Router page and route implementation<br>exports: default function AdminEditAmenityPage<br>imports: react, next/navigation, @/components/ui/button, @/components/dashboard/page-header, @/components/ui/skeleton<br>functions/methods (7): L9 function AdminEditAmenityPage(); L20 callback (inline callback)(); L21 callback async loadAmenity(); L36 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L38 callback (inline callback)(prev); L41 callback async handleSubmit(e: React.FormEvent); L114 callback (inline callback)() |
| `app/admin/amenities/new/page.tsx` | TSX / React · 2,719 bytes · 86 lines | Next.js App Router page and route implementation<br>exports: default function AdminAddAmenityPage<br>imports: react, next/navigation, @/components/ui/button, @/components/dashboard/page-header<br>functions/methods (5): L8 function AdminAddAmenityPage(); L16 callback handleChange(e: any); L18 callback (inline callback)(prev); L21 callback async handleSubmit(e: any); L79 callback (inline callback)() |
| `app/admin/amenities/page.tsx` | TSX / React · 4,061 bytes · 109 lines | Next.js App Router page and route implementation<br>exports: default function AdminAmenitiesPage<br>imports: next/link, @/components/ui/button, lucide-react, react, @/components/admin/import-export-dialog<br>functions/methods (7): L8 function AdminAmenitiesPage(); L12 callback async loadAmenities(); L24 callback (inline callback)(); L28 callback async handleDelete(id: string); L33 callback (inline callback)(a); L79 callback (inline callback)(amenity); L94 callback (inline callback)() |
| `app/admin/blog/[id]/edit/page.tsx` | TSX / React · 704 bytes · 30 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function EditBlogPostPage<br>imports: next, next/navigation, @/lib/auth, @/app/blogs/_actions, @/components/admin/wordpress-blog-editor<br>functions/methods (1): L11 function async EditBlogPostPage({ params, }: { params: Promise<{ id: string }> }) |
| `app/admin/blog/graphql/queries.ts` | TypeScript · 1,874 bytes · 101 lines | Next.js App Router route, metadata, styling, or platform file<br>exports: const GET_BLOG_POST, const UPDATE_BLOG_POST, const DELETE_BLOG_POST, const GET_ALL_BLOG_POSTS<br>imports: @apollo/client |
| `app/admin/blog/new/page.tsx` | TSX / React · 447 bytes · 18 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function NewBlogPostPage<br>imports: next, next/navigation, @/lib/auth, @/components/admin/wordpress-blog-editor<br>functions/methods (1): L10 function async NewBlogPostPage() |
| `app/admin/blog/page.tsx` | TSX / React · 945 bytes · 33 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AdminBlogPage<br>imports: next, next/navigation, @/lib/auth, @/components/admin/blog-posts-list<br>functions/methods (1): L10 function async AdminBlogPage() |
| `app/admin/categories/[id]/edit/page.tsx` | TSX / React · 4,390 bytes · 142 lines | Next.js App Router page and route implementation<br>exports: default function AdminEditCategoryPage<br>imports: react, next/navigation, @/components/ui/button, @/components/dashboard/page-header, @/components/ui/skeleton<br>functions/methods (7): L9 function AdminEditCategoryPage(); L21 callback (inline callback)(); L22 callback async loadCategory(); L37 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L39 callback (inline callback)(prev); L48 callback async handleSubmit(e: React.FormEvent); L135 callback (inline callback)() |
| `app/admin/categories/new/page.tsx` | TSX / React · 3,621 bytes · 103 lines | Next.js App Router page and route implementation<br>exports: default function AdminAddCategoryPage<br>imports: react, next/navigation, @/components/ui/button, @/components/dashboard/page-header<br>functions/methods (5): L8 function AdminAddCategoryPage(); L17 callback handleChange(e: any); L23 callback (inline callback)(prev); L26 callback async handleSubmit(e: any); L96 callback (inline callback)() |
| `app/admin/categories/page.tsx` | TSX / React · 4,719 bytes · 137 lines | Next.js App Router page and route implementation<br>exports: default function AdminCategoriesPage<br>imports: next/link, @/components/ui/button, lucide-react, react, @/components/admin/import-export-dialog, @/hooks/use-toast, @/components/dashboard/page-header<br>functions/methods (7): L10 function AdminCategoriesPage(); L15 callback async loadCategories(); L32 callback (inline callback)(); L36 callback async handleDelete(id: string); L41 callback (inline callback)(c); L107 callback (inline callback)(category); L123 callback (inline callback)() |
| `app/admin/contacts/page.tsx` | TSX / React · 880 bytes · 31 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function ContactsPage<br>imports: next, next/navigation, @/lib/auth, @/components/admin/contacts-list<br>functions/methods (1): L10 function async ContactsPage() |
| `app/admin/dashboard/page.tsx` | TSX / React · 5,918 bytes · 159 lines | Next.js App Router page and route implementation<br>exports: default function AdminDashboardPage<br>imports: react, next/link, lucide-react, @/components/dashboard/page-header, @/components/ui/card, @/components/admin/agent-subscription-analytics<br>functions/methods (6): L10 function AdminDashboardPage(); L21 callback (inline callback)(); L22 callback async loadStats(); L81 callback (inline callback)(stat); L114 callback (inline callback)(action); L138 callback (inline callback)(config) |
| `app/admin/developers/[id]/edit/page.tsx` | TSX / React · 8,980 bytes · 264 lines | Next.js App Router page and route implementation<br>exports: default function EditDeveloperPage<br>imports: react, next/navigation, @/components/ui/button, lucide-react, @/components/dashboard/page-header, @/components/ui/skeleton, sonner<br>functions/methods (13): L11 function EditDeveloperPage(); L25 callback (inline callback)(); L26 callback async loadDeveloper(); L59 callback handleChange(e: any); L61 callback (inline callback)(prev); L64 callback async handleImageUpload(e: any); L70 callback (inline callback)(e); L89 callback (inline callback)(prev); L105 callback handleRemoveLogo(); L107 callback (inline callback)(prev); L113 callback async handleSubmit(e: any); L203 callback (inline callback)(); L257 callback (inline callback)() |
| `app/admin/developers/new/page.tsx` | TSX / React · 7,416 bytes · 207 lines | Next.js App Router page and route implementation<br>exports: default function AdminAddDeveloperPage<br>imports: react, next/navigation, @/components/ui/button, lucide-react, @/components/dashboard/page-header, sonner<br>functions/methods (11): L10 function AdminAddDeveloperPage(); L22 callback handleChange(e: any); L24 callback (inline callback)(prev); L27 callback async handleImageUpload(e: any); L33 callback (inline callback)(e); L51 callback (inline callback)(prev); L67 callback handleRemoveLogo(); L69 callback (inline callback)(prev); L75 callback async handleSubmit(e: any); L145 callback (inline callback)(); L200 callback (inline callback)() |
| `app/admin/developers/page.tsx` | TSX / React · 5,640 bytes · 134 lines | Next.js App Router page and route implementation<br>exports: default function AdminDevelopersPage<br>imports: next/link, @/components/ui/button, lucide-react, react, @/components/admin/import-export-dialog<br>functions/methods (7): L8 function AdminDevelopersPage(); L12 callback async loadDevelopers(); L30 callback (inline callback)(); L34 callback async handleDelete(id: string); L39 callback (inline callback)(d); L90 callback (inline callback)(developer); L116 callback (inline callback)() |
| `app/admin/facilities/[id]/edit/page.tsx` | TSX / React · 3,678 bytes · 121 lines | Next.js App Router page and route implementation<br>exports: default function AdminEditFacilityPage<br>imports: react, next/navigation, @/components/ui/button, @/components/dashboard/page-header, @/components/ui/skeleton<br>functions/methods (7): L9 function AdminEditFacilityPage(); L20 callback (inline callback)(); L21 callback async loadFacility(); L36 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L38 callback (inline callback)(prev); L41 callback async handleSubmit(e: React.FormEvent); L114 callback (inline callback)() |
| `app/admin/facilities/new/page.tsx` | TSX / React · 2,725 bytes · 86 lines | Next.js App Router page and route implementation<br>exports: default function AdminAddFacilityPage<br>imports: react, next/navigation, @/components/ui/button, @/components/dashboard/page-header<br>functions/methods (5): L8 function AdminAddFacilityPage(); L16 callback handleChange(e: any); L18 callback (inline callback)(prev); L21 callback async handleSubmit(e: any); L79 callback (inline callback)() |
| `app/admin/facilities/page.tsx` | TSX / React · 4,090 bytes · 109 lines | Next.js App Router page and route implementation<br>exports: default function AdminFacilitiesPage<br>imports: next/link, @/components/ui/button, lucide-react, react, @/components/admin/import-export-dialog<br>functions/methods (7): L8 function AdminFacilitiesPage(); L12 callback async loadFacilities(); L24 callback (inline callback)(); L28 callback async handleDelete(id: string); L33 callback (inline callback)(f); L79 callback (inline callback)(facility); L94 callback (inline callback)() |
| `app/admin/head-tags/page.tsx` | TSX / React · 17,567 bytes · 470 lines | Next.js App Router page and route implementation<br>exports: default function HeadTagsManagementPage<br>imports: react, @/components/ui/card, @/components/ui/button, @/components/ui/input, @/components/ui/textarea, @/components/ui/badge, @/components/ui/switch, @/components/ui/label, @/components/ui/select, @/components/ui/table, @/hooks/use-toast, @/components/dashboard/page-header, … (13 total)<br>functions/methods (23): L38 function HeadTagsManagementPage(); L52 callback (inline callback)(); L56 callback async fetchTags(); L71 callback validateTag(content: string): string \| null; L105 callback async handleAddTag(); L139 callback async handleToggleActive(id: string, currentStatus: boolean); L148 callback (inline callback)(tag); L158 callback async handleDelete(id: string); L165 callback (inline callback)(tag); L173 callback copyToClipboard(text: string); L178 callback getTagTypeColor(type: string); L188 callback (inline callback)(t); L262 callback (inline callback)(e); L273 callback (inline callback)(value); L279 callback (inline callback)(type); L296 callback (inline callback)(e); L305 callback (inline callback)(checked); L353 callback (inline callback)(); L368 callback (inline callback)(tag); L415 callback (inline callback)(tag); L420 callback (inline callback)(); L444 callback (inline callback)(); L453 callback (inline callback)() |
| `app/admin/homepage-sections/[id]/loading.tsx` | TSX / React · 52 bytes · 3 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (1): L1 function Loading() |
| `app/admin/homepage-sections/[id]/page.tsx` | TSX / React · 7,167 bytes · 193 lines | Next.js App Router page and route implementation<br>exports: default function SectionDetailsPage<br>imports: @/components/layout/header, @/components/admin/admin-nav, @/components/admin/section-property-editor, @/components/ui/button, next/link, react, lucide-react<br>functions/methods (3): L19 function async SectionHeader({ sectionId }: { sectionId: string }); L35 callback (inline callback)(); L166 function async SectionDetailsPage({ params }: Props) |
| `app/admin/homepage-sections/page.tsx` | TSX / React · 25,231 bytes · 693 lines | Next.js App Router page and route implementation<br>exports: default function HomepageSectionsPage<br>imports: react, @/components/ui/button, @/components/ui/input, @/hooks/use-toast, next/link, lucide-react, @/lib/utils, @/components/dashboard/page-header<br>functions/methods (27): L177 function HomepageSectionsPage(); L186 callback (inline callback)(); L190 callback async loadSections(); L214 callback (inline callback)(s, idx); L237 callback async initializeDefaultSections(); L277 callback async toggleActive(id: string, isActive: boolean); L285 callback (inline callback)(s); L301 callback startEditing(section: Section); L307 callback cancelEditing(); L313 callback async saveSection(id: string); L335 callback (inline callback)(s); L367 callback async deleteSection(id: string); L383 callback (inline callback)(s); L458 callback (inline callback)(section); L465 callback (inline callback)(e); L471 callback (inline callback)(e); L512 callback (inline callback)(); L540 callback (inline callback)(); L560 callback (inline callback)(); L577 callback (inline callback)(); L595 callback (inline callback)(section); L601 callback (inline callback)(e); L607 callback (inline callback)(e); L614 callback (inline callback)(); L640 callback (inline callback)(); L663 callback (inline callback)(); L678 callback (inline callback)() |
| `app/admin/import-export/page.tsx` | TSX / React · 9,677 bytes · 255 lines | Next.js App Router page and route implementation<br>exports: default function ImportExportPage<br>imports: react, react, @/components/ui/button, @/components/ui/card, @/hooks/use-toast, lucide-react<br>functions/methods (9): L30 function ImportExportPage(); L36 callback async handleFileSelect(e: React.ChangeEvent<HTMLInputElement>); L66 callback async downloadSample(format: "csv" \| "xlsx"); L106 callback (inline callback)(e); L109 callback (inline callback)(type); L144 callback (inline callback)(); L153 callback (inline callback)(); L210 callback (inline callback)([field, accuracy]); L240 callback (inline callback)(error, idx) |
| `app/admin/layout.tsx` | TSX / React · 970 bytes · 36 lines | Next.js App Router layout and route metadata<br>exports: const dynamic, const revalidate, const metadata, default function AdminLayout<br>imports: react, next, next/navigation, @/lib/auth, @/components/dashboard/dashboard-layout-wrapper<br>functions/methods (1): L16 function async AdminLayout({ children }: { children: React.ReactNode }) |
| `app/admin/leads/page.tsx` | TSX / React · 987 bytes · 32 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function LeadsPage<br>imports: next, next/navigation, @/lib/auth, @/components/admin/leads-list<br>functions/methods (1): L11 function async LeadsPage() |
| `app/admin/locations/[id]/edit/page.tsx` | TSX / React · 10,734 bytes · 286 lines | Next.js App Router page and route implementation<br>exports: default function EditLocationPage<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input, @/components/ui/label, @/components/ui/textarea, @/components/ui/card, @/components/ui/select, @/components/ui/switch, @/components/ui/skeleton, @/hooks/use-toast, … (13 total)<br>functions/methods (17): L18 function EditLocationPage(); L40 callback (inline callback)(); L41 callback async fetchLocation(); L71 callback async handleSubmit(e: React.FormEvent); L150 callback (inline callback)(e); L157 callback (inline callback)(v); L176 callback (inline callback)(e); L184 callback (inline callback)(e); L194 callback (inline callback)(e); L204 callback (inline callback)(e); L214 callback (inline callback)(e); L222 callback (inline callback)(e); L235 callback (inline callback)(e); L243 callback (inline callback)(e); L252 callback (inline callback)(e); L268 callback (inline callback)(v); L276 callback (inline callback)() |
| `app/admin/locations/loading.tsx` | TSX / React · 52 bytes · 3 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (1): L1 function Loading() |
| `app/admin/locations/new/page.tsx` | TSX / React · 8,609 bytes · 220 lines | Next.js App Router page and route implementation<br>exports: default function NewLocationPage<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input, @/components/ui/label, @/components/ui/textarea, @/components/ui/card, @/components/ui/select, @/components/ui/switch, @/hooks/use-toast, @/components/dashboard/page-header<br>functions/methods (14): L17 function NewLocationPage(); L35 callback async handleSubmit(e: React.FormEvent); L85 callback (inline callback)(e); L93 callback (inline callback)(v); L112 callback (inline callback)(e); L121 callback (inline callback)(e); L132 callback (inline callback)(e); L143 callback (inline callback)(e); L154 callback (inline callback)(e); L163 callback (inline callback)(e); L177 callback (inline callback)(e); L186 callback (inline callback)(e); L202 callback (inline callback)(v); L210 callback (inline callback)() |
| `app/admin/locations/page.tsx` | TSX / React · 7,236 bytes · 184 lines | Next.js App Router page and route implementation<br>exports: default function AdminLocationsPage<br>imports: react, next/link, @/components/ui/button, @/components/ui/input, @/components/ui/card, @/components/ui/table, @/components/ui/badge, @/hooks/use-toast, @/components/dashboard/page-header, lucide-react, next/navigation<br>functions/methods (7): L26 function AdminLocationsPage(); L33 callback async fetchLocations(); L47 callback (inline callback)(); L51 callback async handleDelete(id: string); L97 callback (inline callback)(e); L129 callback (inline callback)(location); L168 callback (inline callback)() |
| `app/admin/login/page.tsx` | TSX / React · 1,589 bytes · 42 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AdminLoginPage<br>imports: next, @/components/layout/header, @/components/layout/footer, @/components/forms/admin-login-form, next/link<br>functions/methods (1): L12 function AdminLoginPage() |
| `app/admin/messages/page.tsx` | TSX / React · 928 bytes · 31 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AdminMessagesPage<br>imports: next, next/navigation, @/lib/auth, @/components/admin/buyer-messages-client<br>functions/methods (1): L11 function async AdminMessagesPage() |
| `app/admin/page.tsx` | TSX / React · 115 bytes · 5 lines | Next.js App Router page and route implementation<br>exports: default function AdminPage<br>imports: next/navigation<br>functions/methods (1): L3 function AdminPage() |
| `app/admin/properties/[id]/edit/page.tsx` | TSX / React · 3,584 bytes · 118 lines | Next.js App Router page and route implementation<br>exports: default function AdminEditPropertyPage<br>imports: react, next/navigation, @/components/forms/property-form-multistep, @/hooks/use-toast, @/components/dashboard/page-header, @/components/ui/skeleton<br>functions/methods (3): L10 function AdminEditPropertyPage(); L19 callback (inline callback)(); L20 callback async fetchProperty() |
| `app/admin/properties/new/page.tsx` | TSX / React · 514 bytes · 18 lines | Next.js App Router page and route implementation<br>exports: default function AdminAddPropertyPage<br>imports: @/components/forms/property-form-multistep, @/components/dashboard/page-header<br>functions/methods (1): L6 function AdminAddPropertyPage() |
| `app/admin/properties/page.tsx` | TSX / React · 13,286 bytes · 341 lines | Next.js App Router page and route implementation<br>exports: default function AdminPropertiesPage<br>imports: react, next/link, @/components/ui/button, lucide-react, @/components/admin/import-export-dialog, @/hooks/use-toast, @/components/admin/property-filters, @/components/dashboard/page-header, @/lib/utils<br>functions/methods (19): L13 function AdminPropertiesPage(); L21 callback buildQuery(filters: any); L36 callback async loadProperties(newFilters = filters); L46 callback (inline callback)(p: any); L67 callback (inline callback)(); L72 callback handleFilterChange(newFilters: any); L77 callback async handleDelete(id: string, showConfirm = true); L88 callback (inline callback)(p); L94 callback (inline callback)(); L113 callback async handleBulkDelete(); L145 callback async handleRegenerateSlugs(); L182 callback (inline callback)(); L232 callback (inline callback)(e); L232 callback (inline callback)(p); L271 callback (inline callback)(property: any); L279 callback (inline callback)(e); L283 callback (inline callback)(id); L294 callback (inline callback)(e); L325 callback (inline callback)() |
| `app/admin/properties/review/page.tsx` | TSX / React · 3,993 bytes · 110 lines | Next.js App Router page and route implementation<br>exports: default function AdminReviewQueuePage<br>imports: react, lucide-react, @/components/admin/property-review-card<br>functions/methods (9): L9 function AdminReviewQueuePage(); L15 callback async (inline callback)(status: Tab); L29 callback (inline callback)(); L33 callback handleReviewed(id: string); L35 callback (inline callback)(prev); L35 callback (inline callback)(p); L60 callback (inline callback)(t); L66 callback (inline callback)(); L103 callback (inline callback)(property) |
| `app/admin/quotes/page.tsx` | TSX / React · 858 bytes · 31 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function QuotesPage<br>imports: next, next/navigation, @/lib/auth, @/components/admin/quotes-list<br>functions/methods (1): L10 function async QuotesPage() |
| `app/admin/register/page.tsx` | TSX / React · 2,506 bytes · 54 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AdminRegisterPage<br>imports: next, @/components/layout/header, @/components/layout/footer, @/components/forms/admin-register-form, next/link<br>functions/methods (1): L12 function AdminRegisterPage() |
| `app/admin/rera-requests/[id]/page.tsx` | TSX / React · 22,359 bytes · 578 lines | Next.js App Router page and route implementation<br>exports: default function AdminReraDetailPage<br>imports: next/link, react, @/components/ui/button, @/components/ui/textarea, @/components/ui/dialog, lucide-react, @/components/rera/rera-status-badge, @/lib/models<br>functions/methods (44): L44 function formatDate(d: string \| Date \| undefined); L55 function AdminReraDetailPage({ params }: { params: Promise<{ id: string }> }); L77 callback async load(); L94 callback (inline callback)(); L99 callback async patch(payload: Record<string, unknown>); L124 callback async requestDocuments(); L126 callback (inline callback)(d); L127 callback (inline callback)(d); L139 callback async approve(); L147 callback async reject(); L173 callback (inline callback)(d); L256 callback (inline callback)(d); L276 callback (inline callback)(d); L281 callback (inline callback)(d); L282 callback (inline callback)(d); L310 callback (inline callback)(item, idx); L317 callback (inline callback)(e); L318 callback (inline callback)(prev); L319 callback (inline callback)(d, i); L328 callback (inline callback)(e); L329 callback (inline callback)(prev); L330 callback (inline callback)(d, i); L340 callback (inline callback)(e); L341 callback (inline callback)(prev); L342 callback (inline callback)(d, i); L354 callback (inline callback)(); L354 callback (inline callback)(prev); L354 callback (inline callback)(_, i); L367 callback (inline callback)(); L368 callback (inline callback)(prev); L378 callback (inline callback)(e); L405 callback (inline callback)(s); L415 callback (inline callback)(); L425 callback (inline callback)(); L434 callback (inline callback)(); L448 callback (inline callback)(e); L457 callback (inline callback)(); L469 callback (inline callback)(ev, idx); L510 callback (inline callback)(e); L516 callback (inline callback)(); L538 callback (inline callback)(e); L544 callback (inline callback)(); L558 function BackLink(); L570 function Detail({ label, value }: { label: string; value?: string }) |
| `app/admin/rera-requests/page.tsx` | TSX / React · 5,520 bytes · 140 lines | Next.js App Router page and route implementation<br>exports: default function AdminReraQueuePage<br>imports: next/link, react, lucide-react, @/components/rera/rera-status-badge, @/lib/models<br>functions/methods (6): L20 function AdminReraQueuePage(); L26 callback async (inline callback)(status: Tab); L43 callback (inline callback)(); L64 callback (inline callback)(t); L70 callback (inline callback)(); L102 callback (inline callback)(r) |
| `app/admin/reviews/page.tsx` | TSX / React · 4,933 bytes · 130 lines | Next.js App Router page and route implementation<br>exports: default function AdminReviewsPage<br>imports: react, lucide-react, @/components/ui/button<br>functions/methods (11): L6 function AdminReviewsPage(); L10 callback (inline callback)(); L11 callback async loadReviews(); L26 callback async handleApprove(id: string); L34 callback (inline callback)(r); L41 callback async handleReject(id: string); L45 callback (inline callback)(r); L85 callback (inline callback)(review); L90 callback (inline callback)(_, i); L107 callback (inline callback)(); L116 callback (inline callback)() |
| `app/admin/reward-center/page.tsx` | TSX / React · 10,112 bytes · 88 lines | Next.js App Router page and route implementation<br>exports: default function AdminRewardCenterPage<br>imports: react, swr, lucide-react, @/components/ui/button, @/components/ui/card, @/components/ui/input, @/components/ui/label, @/components/ui/textarea, @/components/ui/badge<br>functions/methods (22): L16 function AdminRewardCenterPage(); L17 callback async (inline callback)(url: string); L22 callback async (inline callback)(url: string); L34 callback async load(); L36 function async createTask(event: React.FormEvent<HTMLFormElement>); L47 function async taskStatus(task: RewardTask, status: "active" \| "paused" \| "archived"); L57 function async review(item: Submission, action: "approved" \| "rejected" \| "revision_requested"); L69 callback (inline callback)(); L73 callback (inline callback)(e); L74 callback (inline callback)(e); L75 callback (inline callback)(e); L76 callback (inline callback)(e); L77 callback (inline callback)(e); L78 callback (inline callback)(e); L82 callback (inline callback)(item); L82 callback (inline callback)(url); L82 callback (inline callback)(); L82 callback (inline callback)(); L82 callback (inline callback)(); L85 callback (inline callback)(task); L85 callback (inline callback)(); L85 callback (inline callback)() |
| `app/admin/rewards/page.tsx` | TSX / React · 9,145 bytes · 86 lines | Next.js App Router page and route implementation<br>exports: default function AdminRewardsPage<br>imports: react, swr, lucide-react, @/components/ui/badge, @/components/ui/button, @/components/ui/card, @/components/ui/input, @/components/ui/label<br>functions/methods (19): L16 function AdminRewardsPage(); L17 callback async (inline callback)(url: string); L22 callback async (inline callback)(url: string); L27 callback async (inline callback)(url: string); L39 callback (inline callback)(); L43 callback async load(); L45 function async saveSettings(event: React.FormEvent<HTMLFormElement>); L55 function async adjust(account: Account, action: "grant" \| "deduct"); L69 function async redeem(item: Redemption, action: "approve" \| "reject"); L80 callback (inline callback)(); L82 callback (inline callback)(e); L82 callback (inline callback)(e); L82 callback (inline callback)(e); L83 callback (inline callback)(item); L83 callback (inline callback)(); L83 callback (inline callback)(); L84 callback (inline callback)(account); L84 callback (inline callback)(); L84 callback (inline callback)() |
| `app/admin/seo/loading.tsx` | TSX / React · 52 bytes · 3 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (1): L1 function Loading() |
| `app/admin/seo/page.tsx` | TSX / React · 26,575 bytes · 598 lines | Next.js App Router page and route implementation<br>exports: default function SEOManagementPage, function Loading<br>imports: next/navigation, react, react, next/link, @/components/ui/card, @/components/ui/tabs, @/components/ui/button, @/components/ui/input, @/components/ui/badge, @/components/ui/table, @/hooks/use-toast, @/components/dashboard/page-header, … (13 total)<br>functions/methods (15): L41 function SEOManagementPage(); L50 callback (inline callback)(); L51 callback async fetchData(); L77 callback async handleDelete(id: string); L83 callback (inline callback)(p); L91 callback (inline callback)(p); L211 callback (inline callback)(); L234 callback (inline callback)(page); L293 callback (inline callback)(e); L324 callback (inline callback)(page); L372 callback (inline callback)(); L572 callback (inline callback)(p); L573 callback (inline callback)(p); L575 callback (inline callback)(item, i); L596 function Loading() |
| `app/admin/seo/pages/[id]/edit/page.tsx` | TSX / React · 10,894 bytes · 291 lines | Next.js App Router page and route implementation<br>exports: default function EditSEOPage<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input, @/components/ui/label, @/components/ui/textarea, @/components/ui/card, @/components/ui/select, @/components/ui/skeleton, @/hooks/use-toast, @/components/dashboard/page-header<br>functions/methods (16): L17 function EditSEOPage(); L38 callback (inline callback)(); L39 callback async fetchPage(); L68 callback async handleSubmit(e: React.FormEvent); L145 callback (inline callback)(e); L152 callback (inline callback)(v); L171 callback (inline callback)(e); L180 callback (inline callback)(e); L190 callback (inline callback)(e); L207 callback (inline callback)(e); L215 callback (inline callback)(e); L224 callback (inline callback)(e); L242 callback (inline callback)(e); L248 callback (inline callback)(v); L271 callback (inline callback)(e); L283 callback (inline callback)() |
| `app/admin/seo/pages/new/loading.tsx` | TSX / React · 52 bytes · 3 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (1): L1 function Loading() |
| `app/admin/seo/pages/new/page.tsx` | TSX / React · 12,041 bytes · 348 lines | Next.js App Router page and route implementation<br>exports: default function NewSEOPage<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input, @/components/ui/label, @/components/ui/textarea, @/components/ui/card, @/components/ui/select, @/hooks/use-toast, @/components/dashboard/page-header, react, … (13 total)<br>functions/methods (16): L17 function NewSEOPageForm(); L113 callback handleLoadTemplate(); L120 callback async handleSubmit(e: React.FormEvent); L171 callback (inline callback)(e); L179 callback (inline callback)(v); L198 callback (inline callback)(e); L208 callback (inline callback)(e); L219 callback (inline callback)(e); L237 callback (inline callback)(e); L245 callback (inline callback)(e); L254 callback (inline callback)(e); L272 callback (inline callback)(e); L279 callback (inline callback)(v); L309 callback (inline callback)(e); L324 callback (inline callback)(); L332 function NewSEOPage() |
| `app/admin/states/[id]/edit/page.tsx` | TSX / React · 3,780 bytes · 128 lines | Next.js App Router page and route implementation<br>exports: default function AdminEditStatePage<br>imports: react, next/navigation, @/components/ui/button, @/components/dashboard/page-header, @/components/ui/skeleton<br>functions/methods (7): L9 function AdminEditStatePage(); L20 callback (inline callback)(); L21 callback async loadState(); L36 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L38 callback (inline callback)(prev); L47 callback async handleSubmit(e: React.FormEvent); L121 callback (inline callback)() |
| `app/admin/states/new/page.tsx` | TSX / React · 2,791 bytes · 90 lines | Next.js App Router page and route implementation<br>exports: default function AdminAddStatePage<br>imports: react, next/navigation, @/components/ui/button, @/components/dashboard/page-header<br>functions/methods (5): L8 function AdminAddStatePage(); L16 callback handleChange(e: any); L22 callback (inline callback)(prev); L25 callback async handleSubmit(e: any); L83 callback (inline callback)() |
| `app/admin/states/page.tsx` | TSX / React · 3,985 bytes · 109 lines | Next.js App Router page and route implementation<br>exports: default function AdminStatesPage<br>imports: next/link, @/components/ui/button, lucide-react, react, @/components/admin/import-export-dialog<br>functions/methods (7): L8 function AdminStatesPage(); L12 callback async loadStates(); L24 callback (inline callback)(); L28 callback async handleDelete(id: string); L33 callback (inline callback)(s); L79 callback (inline callback)(state); L94 callback (inline callback)() |
| `app/admin/subscription-plans/page.tsx` | TSX / React · 410 bytes · 11 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AdminSubscriptionPlansPage<br>imports: next, @/components/admin/subscription-plan-management-page<br>functions/methods (1): L9 function AdminSubscriptionPlansPage() |
| `app/admin/tickets/[id]/page.tsx` | TSX / React · 13,322 bytes · 343 lines | Next.js App Router page and route implementation<br>exports: default function AdminTicketDetailPage<br>imports: react, next/navigation, next/link, @/components/ui/button, @/components/ui/skeleton, lucide-react<br>functions/methods (10): L21 function AdminTicketDetailPage(); L31 callback (inline callback)(); L32 callback async loadTicket(); L48 callback async handleSubmitReply(e: React.FormEvent); L78 callback getPriorityColor(priority: string); L88 callback getStatusColor(status: string); L98 callback getStatusIcon(status: string); L248 callback (inline callback)(reply: any, index: number); L298 callback (inline callback)(e); L313 callback (inline callback)(e) |
| `app/admin/tickets/[id]/reply/page.tsx` | TSX / React · 4,229 bytes · 127 lines | Next.js App Router page and route implementation<br>exports: default function AdminTicketReplyPage<br>imports: react, next/navigation, @/components/ui/button, @/components/dashboard/page-header, @/components/ui/skeleton<br>functions/methods (8): L9 function AdminTicketReplyPage(); L21 callback (inline callback)(); L22 callback async loadTicket(); L27 callback (inline callback)(prev); L38 callback handleChange(e: any); L40 callback (inline callback)(prev); L43 callback async handleSubmit(e: any); L120 callback (inline callback)() |
| `app/admin/tickets/page.tsx` | TSX / React · 8,984 bytes · 210 lines | Next.js App Router page and route implementation<br>exports: default function AdminTicketsPage<br>imports: next/link, react, @/components/ui/button, lucide-react<br>functions/methods (14): L8 function AdminTicketsPage(); L13 callback (inline callback)(); L14 callback async loadTickets(); L29 callback getPriorityColor(priority: string); L39 callback getStatusColor(status: string); L49 callback getStatusIcon(status: string); L64 callback (inline callback)(t); L65 callback (inline callback)(t); L66 callback (inline callback)(t); L67 callback (inline callback)(t); L70 callback (inline callback)(t); L138 callback (inline callback)(tab); L141 callback (inline callback)(); L165 callback (inline callback)(ticket) |
| `app/admin/users/page.tsx` | TSX / React · 24,079 bytes · 578 lines | Next.js App Router page and route implementation<br>exports: default function AdminUsersPage<br>imports: react, lucide-react, @/components/ui/button, @/components/ui/user-avatar, sonner<br>functions/methods (36): L20 function AdminUsersPage(); L40 callback resetForm(); L45 callback async handleAddUser(e: React.FormEvent); L67 callback (inline callback)(prev); L82 callback async (inline callback)(showRefreshIndicator = false); L102 callback (inline callback)(); L106 callback handleRefresh(); L111 callback async handleDelete(userId: string, username: string); L122 callback (inline callback)(u); L134 callback (inline callback)(user); L146 callback (inline callback)(u); L149 callback formatPhone(phone?: string); L159 callback getUserTypeBadge(type: string); L192 callback (inline callback)(); L209 callback (inline callback)(e); L218 callback (inline callback)(); L231 callback (inline callback)(); L240 callback (inline callback)(type); L243 callback (inline callback)(); L320 callback (inline callback)(); L330 callback (inline callback)(user); L387 callback (inline callback)(); L411 callback (inline callback)(u); L417 callback (inline callback)(u); L423 callback (inline callback)(u); L435 callback (inline callback)(); L439 callback (inline callback)(e); L453 callback (inline callback)(); L471 callback (inline callback)(e); L485 callback (inline callback)(e); L499 callback (inline callback)(e); L514 callback (inline callback)(e); L520 callback (inline callback)(); L536 callback (inline callback)(e); L539 callback (inline callback)(type); L553 callback (inline callback)() |
| `app/agent/dashboard/page.tsx` | TSX / React · 8,458 bytes · 173 lines | Next.js App Router page and route implementation<br>exports: default function AssociateDashboardPage<br>imports: react, next/link, @/components/associate/agent-subscription-summary-card<br>functions/methods (7): L8 function AssociateDashboardPage(); L25 callback (inline callback)(); L26 callback async loadData(); L48 callback (inline callback)(sum: number, review: any); L54 callback (inline callback)(property: any); L55 callback (inline callback)(property: any); L62 callback (inline callback)(submission: any) |
| `app/agent/layout.tsx` | TSX / React · 936 bytes · 32 lines | Next.js App Router layout and route metadata<br>exports: const dynamic, const revalidate, const metadata, default function AssociateLayout<br>imports: react, next, next/navigation, @/lib/auth, @/components/dashboard/dashboard-layout-wrapper<br>functions/methods (1): L16 function async AssociateLayout({ children }: { children: React.ReactNode }) |
| `app/agent/leads/page.tsx` | TSX / React · 1,029 bytes · 32 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AssociateLeadsPage<br>imports: next, next/navigation, @/lib/auth, @/components/associate/leads-list<br>functions/methods (1): L11 function async AssociateLeadsPage() |
| `app/agent/login/page.tsx` | TSX / React · 1,879 bytes · 48 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AssociateLoginPage<br>imports: next, @/components/layout/header, @/components/layout/footer, @/components/forms/associate-login-form, next/link<br>functions/methods (1): L12 function AssociateLoginPage() |
| `app/agent/profile/page.tsx` | TSX / React · 4,860 bytes · 143 lines | Next.js App Router page and route implementation<br>exports: default function AssociateProfilePage<br>imports: react, @/components/ui/button, @/components/ui/input, react, lucide-react, @/components/account/profile-image-upload, @/components/account/delete-account-section<br>functions/methods (5): L11 function AssociateProfilePage(); L18 callback (inline callback)(); L19 callback async loadUser(); L43 callback async handleSubmit(e: React.FormEvent); L127 callback (inline callback)(e) |
| `app/agent/properties/[id]/edit/page.tsx` | TSX / React · 1,872 bytes · 60 lines | Next.js App Router page and route implementation<br>exports: default function EditPropertyPage<br>imports: react, next/navigation, @/components/forms/property-form-wrapper, @/components/forms/property-form-multistep<br>functions/methods (3): L8 function EditPropertyPage({ params }: { params: Promise<{ id: string }> }); L14 callback (inline callback)(); L15 callback async loadProperty() |
| `app/agent/properties/new/page.tsx` | TSX / React · 490 bytes · 15 lines | Next.js App Router page and route implementation<br>exports: default function AssociateAddPropertyPage<br>imports: @/components/forms/property-form-wrapper, @/components/forms/property-form-multistep<br>functions/methods (1): L6 function AssociateAddPropertyPage() |
| `app/agent/properties/page.tsx` | TSX / React · 10,226 bytes · 243 lines | Next.js App Router page and route implementation<br>exports: default function AssociatePropertiesPage<br>imports: next/link, @/components/ui/button, lucide-react, react, @/lib/utils<br>functions/methods (14): L21 function getReviewStatus(p: any): "pending" \| "approved" \| "rejected"; L34 function AssociatePropertiesPage(); L39 callback (inline callback)(); L45 callback (inline callback)(); L46 callback async loadProperties(); L61 callback async handleDelete(id: string); L66 callback (inline callback)(p); L76 callback (inline callback)(p); L77 callback (inline callback)(p); L78 callback (inline callback)(p); L100 callback (inline callback)(); L122 callback (inline callback)(s); L158 callback (inline callback)(property); L207 callback (inline callback)() |
| `app/agent/register/page.tsx` | TSX / React · 1,612 bytes · 42 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AssociateRegisterPage<br>imports: next, @/components/layout/header, @/components/layout/footer, @/components/forms/associate-register-form, next/link<br>functions/methods (1): L12 function AssociateRegisterPage() |
| `app/agent/rera/[id]/page.tsx` | TSX / React · 11,341 bytes · 303 lines | Next.js App Router page and route implementation<br>exports: default function AssociateReraDetailPage<br>imports: next/link, react, @/components/ui/button, lucide-react, @/components/rera/rera-status-badge, @/components/forms/document-upload-field, @/lib/models<br>functions/methods (14): L25 function formatDate(d: string \| Date \| undefined); L36 function AssociateReraDetailPage({ params }: { params: Promise<{ id: string }> }); L46 callback async load(); L67 callback (inline callback)(); L72 callback async submitDocuments(); L78 callback (inline callback)(d); L79 callback (inline callback)(d); L123 callback (inline callback)(d); L124 callback (inline callback)(d); L200 callback (inline callback)(d); L206 callback (inline callback)(file); L207 callback (inline callback)(prev); L266 callback (inline callback)(ev, idx); L295 function Detail({ label, value }: { label: string; value?: string }) |
| `app/agent/rera/new/page.tsx` | TSX / React · 11,383 bytes · 322 lines | Next.js App Router page and route implementation<br>exports: default function NewReraRequestPage<br>imports: next/link, react, next/navigation, @/components/ui/button, lucide-react, @/lib/models<br>functions/methods (20): L23 function NewReraRequestPage(); L43 callback (inline callback)(); L44 callback async load(); L61 callback set(key: keyof typeof form, value: string); L62 callback (inline callback)(prev); L65 callback onSelectListing(id: string); L67 callback (inline callback)(x); L74 callback async handleSubmit(e: React.FormEvent); L151 callback (inline callback)(e); L156 callback (inline callback)(l); L178 callback (inline callback)(e); L190 callback (inline callback)(e); L194 callback (inline callback)(t); L208 callback (inline callback)(e); L221 callback (inline callback)(e); L234 callback (inline callback)(e); L247 callback (inline callback)(e); L266 callback (inline callback)(e); L278 callback (inline callback)(e); L290 callback (inline callback)(e) |
| `app/agent/rera/page.tsx` | TSX / React · 5,219 bytes · 129 lines | Next.js App Router page and route implementation<br>exports: default function AssociateReraPage<br>imports: next/link, react, @/components/ui/button, lucide-react, @/components/rera/rera-status-badge, @/lib/models<br>functions/methods (5): L10 function AssociateReraPage(); L14 callback (inline callback)(); L15 callback async load(); L32 callback (inline callback)(r); L92 callback (inline callback)(r) |
| `app/agent/reviews/page.tsx` | TSX / React · 5,266 bytes · 126 lines | Next.js App Router page and route implementation<br>exports: default function AssociateReviewsPage<br>imports: lucide-react, react<br>functions/methods (8): L6 function AssociateReviewsPage(); L10 callback (inline callback)(); L11 callback async loadReviews(); L26 callback (inline callback)(sum, r); L48 callback (inline callback)(_, i); L78 callback (inline callback)(r); L97 callback (inline callback)(review); L101 callback (inline callback)(_, i) |
| `app/agent/subscription/page.tsx` | TSX / React · 368 bytes · 11 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AgentSubscriptionAliasPage<br>imports: next, @/components/associate/agent-subscription-page<br>functions/methods (1): L9 function AgentSubscriptionAliasPage() |
| `app/agent/tickets/[id]/page.tsx` | TSX / React · 11,921 bytes · 310 lines | Next.js App Router page and route implementation<br>exports: default function AssociateTicketDetailPage<br>imports: next/link, react, next/navigation, @/components/ui/button, lucide-react<br>functions/methods (11): L31 function AssociateTicketDetailPage(); L39 callback (inline callback)(); L43 callback async loadTicket(); L55 callback async handleSubmitReply(e: React.FormEvent); L77 callback getPriorityColor(priority: string); L87 callback getStatusColor(status: string); L97 callback getStatusIcon(status: string); L112 callback getAllReplies(): Reply[]; L132 callback (inline callback)(a, b); L226 callback (inline callback)(reply); L282 callback (inline callback)(e) |
| `app/agent/tickets/page.tsx` | TSX / React · 11,999 bytes · 276 lines | Next.js App Router page and route implementation<br>exports: default function AssociateTicketsPage<br>imports: next/link, react, @/components/ui/button, lucide-react, @/components/ui/dialog<br>functions/methods (16): L15 function AssociateTicketsPage(); L27 callback (inline callback)(); L31 callback async loadTickets(); L43 callback async handleSubmit(e: React.FormEvent); L64 callback (inline callback)(t); L65 callback (inline callback)(t); L66 callback (inline callback)(t); L68 callback getStatusIcon(status: string); L82 callback getPriorityColor(priority: string); L117 callback (inline callback)(e); L128 callback (inline callback)(e); L142 callback (inline callback)(e); L156 callback (inline callback)(e); L164 callback (inline callback)(); L233 callback (inline callback)(); L240 callback (inline callback)(ticket) |
| `app/agreements/buyer-advisory/page.tsx` | TSX / React · 13,696 bytes · 287 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function BuyerAdvisoryAgreementPage<br>imports: next, @/components/agreements/agreement-layout, @/components/layout/header<br>functions/methods (1): L18 function BuyerAdvisoryAgreementPage() |
| `app/agreements/channel-partner/page.tsx` | TSX / React · 11,658 bytes · 250 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function ChannelPartnerAgreementPage<br>imports: next, @/components/agreements/agreement-layout, @/components/layout/header<br>functions/methods (1): L20 function ChannelPartnerAgreementPage() |
| `app/agreements/enquiry-form-terms/page.tsx` | TSX / React · 17,022 bytes · 369 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function EnquiryFormTermsPage<br>imports: next, @/components/agreements/agreement-layout, @/components/layout/header<br>functions/methods (1): L17 function EnquiryFormTermsPage() |
| `app/agreements/seller-mandate/page.tsx` | TSX / React · 14,610 bytes · 294 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function SellerMandateAgreementPage<br>imports: next, @/components/agreements/agreement-layout, @/components/layout/header<br>functions/methods (1): L18 function SellerMandateAgreementPage() |
| `app/api/admin/agents/[id]/credits/route.ts` | TypeScript · 1,561 bytes · 33 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function POST<br>imports: next/server, @/lib/auth, @/lib/agent-subscriptions<br>functions/methods (1): L10 function async POST(request: NextRequest, { params }: RouteContext) |
| `app/api/admin/agents/[id]/route.ts` | TypeScript · 2,242 bytes · 52 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function PATCH<br>imports: next/server, @/lib/auth, @/lib/mongodb, @/lib/agent-subscriptions<br>functions/methods (2): L16 function async GET(_request: NextRequest, { params }: RouteContext); L31 function async PATCH(request: NextRequest, { params }: RouteContext) |
| `app/api/admin/agents/[id]/subscription/route.ts` | TypeScript · 2,515 bytes · 56 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function POST<br>imports: next/server, @/lib/auth, @/lib/agent-subscriptions<br>functions/methods (1): L15 function async POST(request: NextRequest, { params }: RouteContext) |
| `app/api/admin/agents/analytics/route.ts` | TypeScript · 6,595 bytes · 118 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET<br>imports: next/server, @/lib/auth, @/lib/mongodb, @/lib/agent-subscriptions<br>functions/methods (12): L9 function async GET(request: NextRequest); L65 callback (inline callback)(subscription); L72 callback (inline callback)(sub); L73 callback (inline callback)(sub); L74 callback (inline callback)(code); L76 callback (inline callback)(sub); L78 callback (inline callback)(item); L80 callback (inline callback)(sub); L81 callback (inline callback)(sub); L82 callback (inline callback)(sum, sub); L90 callback (inline callback)(sum, lot); L98 callback (inline callback)(subscription) |
| `app/api/admin/agents/route.ts` | TypeScript · 3,065 bytes · 67 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET<br>imports: next/server, @/lib/auth, @/lib/mongodb, @/lib/agent-subscriptions<br>functions/methods (3): L9 function escapeRegex(value: string); L13 function async GET(request: NextRequest); L60 callback (inline callback)(user) |
| `app/api/admin/amenities/[id]/route.ts` | TypeScript · 2,475 bytes · 84 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (3): L6 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L26 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L61 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/amenities/route.ts` | TypeScript · 1,234 bytes · 38 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (2): L5 function async GET(); L17 function async POST(req: NextRequest) |
| `app/api/admin/blog/auto-link/route.ts` | TypeScript · 1,426 bytes · 42 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/auth, @/lib/blog-auto-link<br>functions/methods (1): L17 function async POST(request: Request) |
| `app/api/admin/blog/categories/route.ts` | TypeScript · 5,598 bytes · 209 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST, function DELETE<br>imports: mongodb, @/lib/auth<br>functions/methods (5): L6 function slugify(text: string); L15 function async GET(); L37 callback (inline callback)(cat); L61 function async POST(request: Request); L149 function async DELETE(request: Request) |
| `app/api/admin/blog/keywords/route.ts` | TypeScript · 3,315 bytes · 113 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth<br>functions/methods (6): L4 function async GET(); L16 callback (inline callback)(post); L18 callback (inline callback)(k: string); L19 callback (inline callback)(keyword: string); L26 callback (inline callback)(keyword); L52 function async POST(request: Request) |
| `app/api/admin/blog/posts/[id]/route.ts` | TypeScript · 11,523 bytes · 371 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: mongodb, @/lib/auth, @/lib/blog-auto-link<br>functions/methods (6): L7 function slugify(text: string); L17 function extractExcerptFromContent(htmlContent: string, maxLength: number = 200): string; L42 callback (inline callback)(p); L55 function async GET(request: Request, { params }: { params: Promise<{ id: string }> }); L118 function async PUT(request: Request, { params }: { params: Promise<{ id: string }> }); L306 function async DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/blog/posts/route.ts` | TypeScript · 7,510 bytes · 237 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: mongodb, @/lib/auth, @/lib/blog-auto-link<br>functions/methods (6): L7 function slugify(text: string); L17 function extractExcerptFromContent(htmlContent: string, maxLength: number = 200): string; L42 callback (inline callback)(p); L55 function async GET(); L76 callback (inline callback)(post); L102 function async POST(request: Request) |
| `app/api/admin/blog/tags/route.ts` | TypeScript · 3,151 bytes · 116 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth<br>functions/methods (5): L4 function async GET(); L16 callback (inline callback)(post); L18 callback (inline callback)(tag: string); L29 callback (inline callback)(tag); L55 function async POST(request: Request) |
| `app/api/admin/buyer-messages/[id]/route.ts` | TypeScript · 2,850 bytes · 98 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PATCH<br>imports: @/lib/mongodb, @/lib/auth, next/server, next/server, mongodb<br>functions/methods (2): L8 function async GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }); L40 function async PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/buyer-messages/route.ts` | TypeScript · 2,298 bytes · 65 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, @/lib/auth, next/server, next/server<br>functions/methods (2): L7 function async GET(request: NextRequest); L47 callback (inline callback)(t) |
| `app/api/admin/categories/[id]/route.ts` | TypeScript · 2,517 bytes · 85 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (3): L6 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L26 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L62 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/categories/route.ts` | TypeScript · 1,303 bytes · 39 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (2): L5 function async GET(); L17 function async POST(req: NextRequest) |
| `app/api/admin/contacts/route.ts` | TypeScript · 1,202 bytes · 42 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: mongodb, @/lib/auth<br>functions/methods (1): L6 function async GET(request: Request) |
| `app/api/admin/developers/[id]/route.ts` | TypeScript · 3,115 bytes · 93 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, next/server, mongodb<br>functions/methods (3): L10 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L33 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L73 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/developers/route.ts` | TypeScript · 1,722 bytes · 54 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (2): L9 function async GET(); L26 function async POST(req: NextRequest) |
| `app/api/admin/facilities/[id]/route.ts` | TypeScript · 2,490 bytes · 84 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (3): L6 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L26 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L61 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/facilities/route.ts` | TypeScript · 1,245 bytes · 38 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (2): L5 function async GET(); L17 function async POST(req: NextRequest) |
| `app/api/admin/head-tags/[id]/route.ts` | TypeScript · 3,286 bytes · 107 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: next/server, @/lib/mongodb, mongodb<br>functions/methods (3): L6 function async GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }); L33 function async PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }); L83 function async DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/head-tags/route.ts` | TypeScript · 2,997 bytes · 90 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: next/server, @/lib/mongodb, mongodb<br>functions/methods (3): L6 function async GET(); L16 callback (inline callback)(tag); L29 function async POST(request: NextRequest) |
| `app/api/admin/homepage-sections/[id]/properties/route.ts` | TypeScript · 2,364 bytes · 67 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, @/lib/schemas, mongodb<br>functions/methods (2): L6 function async POST(req: Request, { params }: { params: Promise<{ id: string }> }); L41 function async DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/homepage-sections/[id]/route.ts` | TypeScript · 3,839 bytes · 116 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function PATCH, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, @/lib/schemas<br>functions/methods (4): L10 function async GET(req: Request, context: Context); L40 function async PUT(req: Request, context: Context); L66 function async PATCH(req: Request, context: Context); L91 function async DELETE(req: Request, context: Context) |
| `app/api/admin/homepage-sections/initialize/route.ts` | TypeScript · 5,503 bytes · 182 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, @/lib/auth, @/lib/schemas<br>functions/methods (4): L120 function async POST(); L151 callback (inline callback)(s); L170 callback (inline callback)(id); L175 callback (inline callback)(id) |
| `app/api/admin/homepage-sections/route.ts` | TypeScript · 2,158 bytes · 61 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, @/lib/schemas<br>functions/methods (3): L5 function async GET(); L28 callback (inline callback)(s); L44 function async POST(req: Request) |
| `app/api/admin/import-export/export/route.ts` | TypeScript · 1,909 bytes · 52 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/auth, @/lib/mongodb, next/server, @/lib/import-export<br>functions/methods (2): L6 function async GET(req: NextRequest); L25 callback (inline callback)({ _id, ...rest }) |
| `app/api/admin/import-export/import/route.ts` | TypeScript · 7,694 bytes · 243 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/auth, @/lib/mongodb, next/server, @/lib/import-export<br>functions/methods (8): L12 function async findOrCreateConfigEntry(db: any, collection: string, name: string, additionalFields: Record<string, any> = {}): Promise<{ _id: string; isNew: boolean }>; L46 function async processPropertyConfigFields(db: any, record: any): Promise<{ processedRecord: any configCreations: ConfigCreationResult[] }>; L91 callback (inline callback)(a: string); L110 callback (inline callback)(f: string); L129 function async POST(req: NextRequest); L166 callback (inline callback)(r); L172 callback (inline callback)(r); L172 callback (inline callback)(r) |
| `app/api/admin/import-export/samples/route.ts` | TypeScript · 7,372 bytes · 214 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/auth, next/server, xlsx<br>functions/methods (3): L156 function async GET(req: NextRequest); L189 callback (inline callback)(record: any); L191 callback (inline callback)(header) |
| `app/api/admin/import-export/validate/route.ts` | TypeScript · 1,397 bytes · 39 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/auth, next/server, @/lib/import-export<br>functions/methods (1): L5 function async POST(req: NextRequest) |
| `app/api/admin/leads/[id]/assign/route.ts` | TypeScript · 3,760 bytes · 135 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, next/server, mongodb, next/server<br>functions/methods (2): L8 function async POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }); L89 function async DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/leads/[id]/notes/route.ts` | TypeScript · 2,472 bytes · 78 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server, mongodb, next/server<br>functions/methods (1): L8 function async POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/leads/[id]/route.ts` | TypeScript · 5,195 bytes · 184 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, next/server, mongodb, next/server<br>functions/methods (3): L8 function async GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }); L93 function async PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }); L153 function async DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/leads/route.ts` | TypeScript · 5,215 bytes · 152 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server, mongodb, next/server, @/lib/models<br>functions/methods (3): L9 function async GET(request: NextRequest); L65 callback (inline callback)(lead); L98 function async POST(request: NextRequest) |
| `app/api/admin/locations/[id]/route.ts` | TypeScript · 3,639 bytes · 117 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (3): L6 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L31 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L90 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/locations/route.ts` | TypeScript · 2,704 bytes · 89 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (3): L5 function async GET(req: NextRequest); L29 callback (inline callback)(l); L41 function async POST(req: NextRequest) |
| `app/api/admin/news/[id]/route.ts` | TypeScript · 2,403 bytes · 84 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: @/lib/auth, @/lib/mongodb, mongodb, next/server<br>functions/methods (3): L6 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L26 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L61 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/news/route.ts` | TypeScript · 2,139 bytes · 75 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST, function PUT<br>imports: @/lib/auth, @/lib/mongodb, mongodb<br>functions/methods (3): L5 function async GET(); L22 function async POST(req: Request); L45 function async PUT(req: Request) |
| `app/api/admin/properties/[id]/review/route.ts` | TypeScript · 1,660 bytes · 46 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function POST<br>imports: @/lib/auth, next/server, @/lib/agent-subscriptions<br>functions/methods (2): L13 function async POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L21 callback (inline callback)() |
| `app/api/admin/properties/[id]/route.ts` | TypeScript · 7,208 bytes · 210 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server, @/lib/agent-subscriptions<br>functions/methods (3): L11 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L69 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L186 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/properties/regenerate-slugs/route.ts` | TypeScript · 1,724 bytes · 57 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (1): L5 function async POST(req: NextRequest) |
| `app/api/admin/properties/review/route.ts` | TypeScript · 2,980 bytes · 81 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (2): L11 function async GET(req: NextRequest); L67 callback (inline callback)(p) |
| `app/api/admin/properties/route.ts` | TypeScript · 6,009 bytes · 189 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (4): L10 function async GET(req: NextRequest); L91 callback (inline callback)(p); L98 callback (inline callback)(p: any); L115 function async POST(req: NextRequest) |
| `app/api/admin/quotes/route.ts` | TypeScript · 1,196 bytes · 42 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: mongodb, @/lib/auth<br>functions/methods (1): L6 function async GET(request: Request) |
| `app/api/admin/rera-requests/[id]/route.ts` | TypeScript · 6,709 bytes · 190 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function PATCH<br>imports: @/lib/mongodb, @/lib/auth, @/lib/models, mongodb, next/server<br>functions/methods (6): L17 function async GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }); L52 function async PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L73 callback (inline callback)(); L100 callback (inline callback)(d); L101 callback (inline callback)(d, idx); L115 callback (inline callback)(d: ReraRequestedDocument) |
| `app/api/admin/rera-requests/route.ts` | TypeScript · 1,977 bytes · 58 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET<br>imports: @/lib/mongodb, @/lib/auth, @/lib/models, next/server<br>functions/methods (2): L11 function async GET(req: NextRequest); L51 callback (inline callback)(r) |
| `app/api/admin/reviews/[id]/route.ts` | TypeScript · 2,822 bytes · 56 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (2): L6 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L33 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/reviews/route.ts` | TypeScript · 675 bytes · 20 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (1): L5 function async GET() |
| `app/api/admin/reward-accounts/route.ts` | TypeScript · 2,149 bytes · 39 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET, function PATCH<br>imports: next/server, @/lib/auth, @/lib/mongodb, @/lib/reward-system<br>functions/methods (2): L8 function async GET(); L27 function async PATCH(request: Request) |
| `app/api/admin/reward-redemptions/route.ts` | TypeScript · 7,965 bytes · 98 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET, function PATCH<br>imports: next/server, mongodb, @/lib/auth, @/lib/mongodb, @/lib/reward-system, @/lib/agent-subscriptions<br>functions/methods (5): L10 function async GET(); L27 function async PATCH(request: Request); L48 callback async (inline callback)(transactionDb, session); L64 callback async (inline callback)(transactionDb, session); L77 callback async (inline callback)(transactionDb, session) |
| `app/api/admin/reward-settings/route.ts` | TypeScript · 3,005 bytes · 39 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET, function PUT<br>imports: next/server, mongodb, @/lib/auth, @/lib/mongodb, @/lib/reward-system<br>functions/methods (2): L9 function async GET(); L21 function async PUT(request: Request) |
| `app/api/admin/reward-submissions/route.ts` | TypeScript · 2,195 bytes · 38 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET, function PATCH<br>imports: next/server, @/lib/auth, @/lib/mongodb, @/lib/reward-system<br>functions/methods (2): L8 function async GET(); L26 function async PATCH(request: Request) |
| `app/api/admin/reward-tasks/[id]/route.ts` | TypeScript · 1,488 bytes · 24 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function PATCH<br>imports: mongodb, next/server, @/lib/auth, @/lib/mongodb<br>functions/methods (1): L6 function async PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/reward-tasks/route.ts` | TypeScript · 3,354 bytes · 44 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET, function POST<br>imports: next/server, @/lib/auth, @/lib/mongodb, @/lib/reward-system<br>functions/methods (4): L8 function async GET(); L21 function async POST(request: Request); L37 callback (inline callback)(id: unknown); L37 callback (inline callback)(id: string) |
| `app/api/admin/seo/pages/[id]/route.ts` | TypeScript · 3,673 bytes · 112 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (3): L6 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L35 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L85 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/seo/pages/route.ts` | TypeScript · 2,493 bytes · 76 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (3): L5 function async GET(req: NextRequest); L26 callback (inline callback)(p); L38 function async POST(req: NextRequest) |
| `app/api/admin/seo/stats/route.ts` | TypeScript · 2,274 bytes · 63 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/auth, @/lib/mongodb<br>functions/methods (1): L4 function async GET() |
| `app/api/admin/states/[id]/route.ts` | TypeScript · 2,430 bytes · 84 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (3): L6 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L26 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L61 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/states/route.ts` | TypeScript · 1,229 bytes · 38 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (2): L5 function async GET(); L17 function async POST(req: NextRequest) |
| `app/api/admin/subscription-plans/[id]/route.ts` | TypeScript · 3,949 bytes · 87 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function PATCH, function DELETE<br>imports: @/lib/auth, @/lib/mongodb, next/server, @/lib/agent-subscriptions<br>functions/methods (5): L18 function errorResponse(error: unknown); L26 function async PATCH(request: Request, { params }: RouteContext); L34 callback async (inline callback)(db, session); L59 function async DELETE(_request: Request, { params }: RouteContext); L66 callback async (inline callback)(db, session) |
| `app/api/admin/subscription-plans/initialize/route.ts` | TypeScript · 1,489 bytes · 39 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function POST<br>imports: @/lib/auth, @/lib/mongodb, next/server, @/lib/agent-subscriptions<br>functions/methods (2): L17 function async POST(); L25 callback async (inline callback)(transactionDb, session) |
| `app/api/admin/subscription-plans/route.ts` | TypeScript · 2,610 bytes · 63 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function POST<br>imports: @/lib/auth, @/lib/mongodb, next/server, @/lib/agent-subscriptions<br>functions/methods (4): L17 function errorResponse(error: unknown); L28 function async GET(); L41 function async POST(request: Request); L47 callback async (inline callback)(db, session) |
| `app/api/admin/tickets/[id]/reply/route.ts` | TypeScript · 1,486 bytes · 48 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (1): L6 function async POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/tickets/[id]/route.ts` | TypeScript · 917 bytes · 26 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (1): L6 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/admin/tickets/route.ts` | TypeScript · 675 bytes · 20 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (1): L5 function async GET() |
| `app/api/admin/users/route.ts` | TypeScript · 5,111 bytes · 172 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, bcryptjs, next/server, mongodb, next/server<br>functions/methods (4): L10 function async GET(); L35 callback (inline callback)(u); L47 function async POST(request: NextRequest); L130 function async DELETE(request: NextRequest) |
| `app/api/agent/leads/[id]/route.ts` | TypeScript · 4,330 bytes · 133 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT<br>imports: @/lib/mongodb, @/lib/auth, next/server, mongodb, next/server<br>functions/methods (2): L8 function async GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }); L67 function async PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/agent/leads/route.ts` | TypeScript · 4,320 bytes · 119 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, @/lib/auth, next/server, next/server, @/lib/models<br>functions/methods (2): L8 function async GET(request: NextRequest); L81 callback (inline callback)(lead) |
| `app/api/agent/profile/route.ts` | TypeScript · 987 bytes · 35 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function PUT<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (1): L6 function async PUT(req: NextRequest) |
| `app/api/agent/properties/[id]/route.ts` | TypeScript · 5,627 bytes · 146 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server, @/lib/agent-subscriptions<br>functions/methods (3): L7 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L37 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L123 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/agent/properties/route.ts` | TypeScript · 2,953 bytes · 84 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (2): L5 function async GET(req: NextRequest); L33 function async POST(req: NextRequest) |
| `app/api/agent/rera-requests/[id]/route.ts` | TypeScript · 4,385 bytes · 117 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function PATCH<br>imports: @/lib/mongodb, @/lib/auth, @/lib/models, mongodb, next/server<br>functions/methods (8): L10 function async loadOwnedRequest(id: string, user: any, db: any); L26 function async GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }); L50 function async PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L65 callback (inline callback)(); L75 callback (inline callback)(u); L78 callback (inline callback)(d); L88 callback (inline callback)(d); L89 callback (inline callback)(d) |
| `app/api/agent/rera-requests/route.ts` | TypeScript · 5,614 bytes · 140 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, @/lib/models, mongodb, next/server<br>functions/methods (4): L14 function async GET(); L30 callback (inline callback)(r); L39 function async POST(req: NextRequest); L46 callback (inline callback)() |
| `app/api/agent/subscription/checkout/route.ts` | TypeScript · 738 bytes · 22 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function POST<br>imports: next/server, @/lib/auth<br>functions/methods (1): L7 function async POST() |
| `app/api/agent/subscription/plans/route.ts` | TypeScript · 1,189 bytes · 25 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET<br>imports: next/server, @/lib/auth, @/lib/mongodb, @/lib/agent-subscriptions<br>functions/methods (1): L9 function async GET() |
| `app/api/agent/subscription/route.ts` | TypeScript · 1,002 bytes · 22 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET<br>imports: next/server, @/lib/auth, @/lib/mongodb, @/lib/agent-subscriptions<br>functions/methods (1): L9 function async GET() |
| `app/api/agent/tickets/[id]/route.ts` | TypeScript · 2,471 bytes · 80 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (2): L6 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L31 function async POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/agent/tickets/route.ts` | TypeScript · 2,035 bytes · 63 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server, next/server<br>functions/methods (2): L6 function async GET(); L27 function async POST(req: NextRequest) |
| `app/api/agents/route.ts` | TypeScript · 1,341 bytes · 40 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET<br>imports: @/lib/mongodb, next/server<br>functions/methods (2): L8 function async GET(); L26 callback (inline callback)(a) |
| `app/api/associate/leads/[id]/route.ts` | TypeScript · 3,938 bytes · 129 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT<br>imports: @/lib/mongodb, @/lib/auth, next/server, mongodb, next/server<br>functions/methods (2): L8 function async GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }); L65 function async PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/associate/leads/route.ts` | TypeScript · 3,761 bytes · 109 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, @/lib/auth, next/server, next/server, @/lib/models<br>functions/methods (2): L8 function async GET(request: NextRequest); L72 callback (inline callback)(lead) |
| `app/api/associate/profile/route.ts` | TypeScript · 987 bytes · 35 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function PUT<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (1): L6 function async PUT(req: NextRequest) |
| `app/api/associate/properties/[id]/route.ts` | TypeScript · 4,795 bytes · 143 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server, @/lib/agent-subscriptions<br>functions/methods (3): L7 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L36 function async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L118 function async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/associate/properties/route.ts` | TypeScript · 2,420 bytes · 77 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (2): L5 function async GET(req: NextRequest); L30 function async POST(req: NextRequest) |
| `app/api/associate/redeem/route.ts` | TypeScript · 4,222 bytes · 46 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function POST<br>imports: next/server, mongodb, @/lib/auth, @/lib/mongodb, @/lib/reward-system, @/lib/agent-subscriptions<br>functions/methods (2): L10 function async POST(request: Request); L18 callback async (inline callback)(db, session) |
| `app/api/associate/rera-requests/[id]/route.ts` | TypeScript · 4,085 bytes · 114 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function PATCH<br>imports: @/lib/mongodb, @/lib/auth, @/lib/models, mongodb, next/server<br>functions/methods (8): L10 function async loadOwnedRequest(id: string, user: any, db: any); L26 function async GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }); L48 function async PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L63 callback (inline callback)(); L73 callback (inline callback)(u); L76 callback (inline callback)(d); L85 callback (inline callback)(d); L86 callback (inline callback)(d) |
| `app/api/associate/rera-requests/route.ts` | TypeScript · 5,050 bytes · 134 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, @/lib/models, mongodb, next/server<br>functions/methods (4): L13 function async GET(); L29 callback (inline callback)(r); L37 function async POST(req: NextRequest); L44 callback (inline callback)() |
| `app/api/associate/reviews/route.ts` | TypeScript · 1,516 bytes · 46 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, @/lib/auth, next/server<br>functions/methods (4): L5 function async GET(); L21 callback (inline callback)(p); L35 callback (inline callback)(p); L36 callback (inline callback)(r) |
| `app/api/associate/reward-tasks/route.ts` | TypeScript · 5,389 bytes · 61 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET, function POST<br>imports: next/server, @/lib/auth, @/lib/mongodb, @/lib/reward-system<br>functions/methods (5): L8 function async GET(); L19 callback (inline callback)(submission); L20 callback (inline callback)(task); L26 function async POST(request: Request); L33 callback (inline callback)(item: unknown) |
| `app/api/associate/rewards/route.ts` | TypeScript · 1,141 bytes · 31 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET<br>imports: next/server, @/lib/auth, @/lib/mongodb, @/lib/reward-system<br>functions/methods (2): L8 function async GET(); L23 callback (inline callback)(task) |
| `app/api/associate/tickets/[id]/route.ts` | TypeScript · 2,309 bytes · 78 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (2): L6 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }); L31 function async POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/associate/tickets/route.ts` | TypeScript · 1,972 bytes · 63 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server, next/server<br>functions/methods (2): L6 function async GET(); L27 function async POST(req: NextRequest) |
| `app/api/associates/route.ts` | TypeScript · 1,301 bytes · 40 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET<br>imports: @/lib/mongodb, next/server<br>functions/methods (2): L8 function async GET(); L26 callback (inline callback)(a) |
| `app/api/auth/apple/route.ts` | TypeScript · 5,534 bytes · 136 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: node:crypto, next/headers, mongodb, @/lib/session-token<br>functions/methods (5): L20 function async verifyAppleIdentityToken(token: string): Promise<AppleClaims>; L30 callback (inline callback)(key); L39 callback (inline callback)(value); L46 callback (inline callback)(audience); L53 function async POST(request: Request) |
| `app/api/auth/buyer-quick-register/route.ts` | TypeScript · 4,470 bytes · 144 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, bcryptjs, next/headers, next/server, @/lib/session-token<br>functions/methods (1): L19 function async POST(request: Request) |
| `app/api/auth/delete-account/route.ts` | TypeScript · 3,024 bytes · 82 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function POST<br>imports: next/headers, next/server, mongodb, @/lib/auth<br>functions/methods (2): L18 function async POST(); L65 callback (inline callback)() |
| `app/api/auth/google/route.ts` | TypeScript · 7,898 bytes · 239 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: node:crypto, mongodb, next/headers, @/lib/session-token<br>functions/methods (6): L19 constructor (inline callback)(message: string, readonly status: number = 401); L38 function decodeFirebaseTokenPart(part: string): T; L46 function async verifyFirebaseIdToken(token: string): Promise<GoogleAuthPayload>; L57 callback (inline callback)(key); L95 function async handleGoogleAuth(payload: GoogleAuthPayload); L179 function async POST(request: Request) |
| `app/api/auth/login/route.ts` | TypeScript · 2,508 bytes · 93 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: mongodb, bcryptjs, next/headers, @/lib/session-token<br>functions/methods (2): L8 function async loginUser(email: string, password: string); L50 function async POST(request: Request) |
| `app/api/auth/logout/route.ts` | TypeScript · 353 bytes · 17 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: next/headers<br>functions/methods (1): L3 function async POST() |
| `app/api/auth/me/route.ts` | TypeScript · 1,588 bytes · 55 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET<br>imports: @/lib/auth<br>functions/methods (1): L18 function async GET() |
| `app/api/auth/register/route.ts` | TypeScript · 3,250 bytes · 129 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, bcryptjs, next/server, @/lib/email<br>functions/methods (1): L12 function async POST(request: Request) |
| `app/api/blog/posts/route.ts` | TypeScript · 10,561 bytes · 347 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function PUT, function DELETE<br>imports: mongodb, @/lib/auth<br>functions/methods (6): L6 function slugify(text: string); L16 function extractExcerptFromContent(htmlContent: string, maxLength: number = 200): string; L41 callback (inline callback)(p); L54 function async GET(request: Request, { params }: { params: Promise<{ id: string }> }); L117 function async PUT(request: Request, { params }: { params: Promise<{ id: string }> }); L282 function async DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) |
| `app/api/buyer/inquiries/route.ts` | TypeScript · 2,200 bytes · 58 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, @/lib/auth, next/server, next/server<br>functions/methods (2): L7 function async GET(request: NextRequest); L38 callback (inline callback)(l) |
| `app/api/buyer/messages/[id]/reply/route.ts` | TypeScript · 1,947 bytes · 65 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server, next/server, mongodb<br>functions/methods (1): L8 function async POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/buyer/messages/route.ts` | TypeScript · 2,748 bytes · 84 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/auth, next/server, next/server, mongodb<br>functions/methods (3): L8 function async GET(request: NextRequest); L23 callback (inline callback)(t); L33 function async POST(request: NextRequest) |
| `app/api/callback/route.ts` | TypeScript · 6,053 bytes · 143 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, next/server, @/lib/email<br>functions/methods (2): L8 function callbackAdminTemplate({ name, phone, message }: { name: string; phone: string; message: string }); L90 function async POST(request: Request) |
| `app/api/categories/route.ts` | TypeScript · 470 bytes · 14 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, next/server<br>functions/methods (1): L4 function async GET() |
| `app/api/contact/route.ts` | TypeScript · 1,858 bytes · 72 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, next/server, @/lib/email<br>functions/methods (1): L11 function async POST(request: Request) |
| `app/api/developers/[slug]/projects/route.ts` | TypeScript · 4,109 bytes · 133 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, next/server, mongodb<br>functions/methods (2): L5 function async GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }); L111 callback (inline callback)(p) |
| `app/api/developers/[slug]/route.ts` | TypeScript · 3,872 bytes · 121 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, next/server, mongodb<br>functions/methods (2): L5 function async GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }); L93 callback (inline callback)(p) |
| `app/api/developers/route.ts` | TypeScript · 943 bytes · 30 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, next/server<br>functions/methods (2): L4 function async GET(); L13 callback async (inline callback)(dev) |
| `app/api/enquiries/route.ts` | TypeScript · 4,116 bytes · 162 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, next/server, @/lib/email<br>functions/methods (1): L13 function async POST(req: NextRequest) |
| `app/api/head-tags/route.ts` | TypeScript · 678 bytes · 26 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: next/server, @/lib/mongodb<br>functions/methods (2): L5 function async GET(); L15 callback (inline callback)(tag) |
| `app/api/homepage-sections-with-properties/route.ts` | TypeScript · 4,424 bytes · 150 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET<br>imports: @/lib/mongodb, @/lib/schemas, mongodb<br>functions/methods (6): L10 function getDominantCategory(properties: any[]): string \| null; L39 function buildFilterParams(section: any, properties: any[]): string; L101 function async GET(); L113 callback async (inline callback)(section); L121 callback (inline callback)(id); L136 callback (inline callback)(prop) |
| `app/api/homepage-sections/[id]/properties/route.ts` | TypeScript · 2,002 bytes · 54 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST, function DELETE<br>imports: next/server, @/lib/mongodb, @/lib/auth, mongodb<br>functions/methods (2): L6 function async POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }); L31 function async DELETE(request: NextRequest, { params }: { params: Promise<{ id: string; propertyId?: string }> }) |
| `app/api/homepage-sections/route.ts` | TypeScript · 1,124 bytes · 36 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET, function POST<br>imports: @/lib/mongodb, @/lib/schemas<br>functions/methods (2): L4 function async GET(); L21 function async POST(req: Request) |
| `app/api/imagekit-auth/route.ts` | TypeScript · 647 bytes · 21 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/imagekit, next/server<br>functions/methods (1): L4 function async GET() |
| `app/api/locations/[slug]/route.ts` | TypeScript · 6,607 bytes · 186 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, next/server<br>functions/methods (5): L4 function async GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }); L22 callback (inline callback)(word: string); L54 callback (inline callback)(p: string); L58 callback (inline callback)(phrase: string); L167 callback (inline callback)(p) |
| `app/api/news/[slug]/route.ts` | TypeScript · 667 bytes · 22 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, next/server<br>functions/methods (1): L4 function async GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) |
| `app/api/news/route.ts` | TypeScript · 1,010 bytes · 35 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, next/server<br>functions/methods (1): L4 function async GET(req: NextRequest) |
| `app/api/otp/send/route.ts` | TypeScript · 945 bytes · 31 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: next/server, @/lib/otp<br>functions/methods (1): L4 function async POST(req: NextRequest) |
| `app/api/otp/verify/route.ts` | TypeScript · 813 bytes · 30 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: next/server, @/lib/otp<br>functions/methods (1): L4 function async POST(req: NextRequest) |
| `app/api/properties/[id]/reviews/route.ts` | TypeScript · 4,224 bytes · 61 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET, function POST<br>imports: @/lib/auth, @/lib/mongodb, mongodb, next/server<br>functions/methods (3): L8 function async GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }); L29 callback (inline callback)(sum, review); L35 function async POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/properties/[id]/route.ts` | TypeScript · 1,509 bytes · 47 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, mongodb, next/server<br>functions/methods (1): L5 function async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) |
| `app/api/properties/route.ts` | TypeScript · 9,897 bytes · 310 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET<br>imports: @/lib/mongodb, next/server, mongodb<br>functions/methods (6): L9 function async GET(req: NextRequest); L90 callback (inline callback)(pt); L98 callback (inline callback)(pc); L106 callback (inline callback)(ts); L114 callback (inline callback)(pt); L292 callback (inline callback)(p) |
| `app/api/properties/type-lookup/[slug]/route.ts` | TypeScript · 1,509 bytes · 47 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: next/server, @/lib/mongodb<br>functions/methods (3): L11 function getPropertyTypeSlug(propertyType: string): string; L16 callback (inline callback)(t); L23 function async GET(request: Request, { params }: { params: Promise<{ slug: string }> }) |
| `app/api/property-enquiry/route.ts` | TypeScript · 8,574 bytes · 287 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, next/server, mongodb, bcryptjs, next/headers, @/lib/email, @/lib/models, @/lib/otp, @/lib/session-token<br>functions/methods (2): L21 function async autoRegisterBuyer(name: string, phone: string, req: NextRequest): Promise<{ userId: string; username: string; email: string; userType: string; isNew: boolean }>; L99 function async POST(req: NextRequest) |
| `app/api/quote/route.ts` | TypeScript · 2,151 bytes · 88 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, next/server, @/lib/email<br>functions/methods (1): L11 function async POST(request: Request) |
| `app/api/reports/route.ts` | TypeScript · 1,549 bytes · 41 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: next/server, @/lib/mongodb, @/lib/auth<br>functions/methods (2): L8 function async POST(request: Request); L10 callback (inline callback)() |
| `app/api/reviews/[id]/actions/route.ts` | TypeScript · 2,700 bytes · 46 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: mongodb, next/server, @/lib/auth, @/lib/mongodb<br>functions/methods (1): L6 function async POST(request: Request, { params }: { params: Promise<{ id: string }> }) |
| `app/api/search/voice/route.ts` | TypeScript · 29,778 bytes · 877 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, const revalidate, function GET, function POST<br>imports: @/lib/mongodb, next/server<br>functions/methods (43): L153 function normalizeText(text: string): string; L161 function tokenize(text: string): string[]; L166 function fuzzyMatch(query: string, target: string, threshold = 0.6): boolean; L184 function levenshteinDistance(a: string, b: string): number; L185 callback (inline callback)(); L205 function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number; L216 function toRad(deg: number): number; L249 function async parseVoiceQuery(query: string, db: any): Promise<ParsedQuery>; L328 callback (inline callback)(alias); L409 callback (inline callback)(kw); L416 callback (inline callback)(kw); L423 callback (inline callback)(kw); L430 callback (inline callback)(kw); L437 callback (inline callback)(kw); L444 callback (inline callback)(kw); L471 callback (inline callback)(t); L482 callback (inline callback)(t); L495 callback (inline callback)(d); L504 callback (inline callback)(t); L514 function buildMongoQuery(parsed: ParsedQuery): any; L525 callback (inline callback)(loc); L537 callback (inline callback)(c); L542 callback (inline callback)(sector); L548 callback (inline callback)(c); L553 callback (inline callback)(type); L559 callback (inline callback)(c); L589 callback (inline callback)(s); L594 callback (inline callback)(c); L601 callback (inline callback)(s); L608 callback (inline callback)(d); L614 callback (inline callback)(amenity); L621 callback (inline callback)(c); L627 callback (inline callback)(type); L635 callback (inline callback)(landmark); L642 callback (inline callback)(c); L684 function filterByDistance(properties: any[], userLocation: UserLocation, maxDistanceKm: number): any[]; L692 callback (inline callback)(property); L708 callback (inline callback)(property); L709 callback (inline callback)(a, b); L713 function formatDistance(km: number): string; L724 function async GET(req: NextRequest); L793 callback (inline callback)(p); L845 function async POST(req: NextRequest) |
| `app/api/sell-enquiry/route.ts` | TypeScript · 3,238 bytes · 118 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: @/lib/mongodb, next/server, @/lib/email<br>functions/methods (1): L11 function async POST(request: Request) |
| `app/api/send-eoi/route.ts` | TypeScript · 2,513 bytes · 65 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: next/server, nodemailer<br>functions/methods (1): L5 function async POST(request: Request) |
| `app/api/states/route.ts` | TypeScript · 450 bytes · 14 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function GET<br>imports: @/lib/mongodb, next/server<br>functions/methods (1): L4 function async GET() |
| `app/api/upload/route.ts` | TypeScript · 1,469 bytes · 49 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function POST<br>imports: next/server, @/lib/imagekit<br>functions/methods (1): L4 function async POST(req: NextRequest) |
| `app/api/user/profile/route.ts` | TypeScript · 2,319 bytes · 61 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: function PUT<br>imports: @/lib/mongodb, @/lib/auth, mongodb, next/server<br>functions/methods (1): L10 function async PUT(req: NextRequest) |
| `app/api/well-known/apple-app-site-association/route.ts` | TypeScript · 972 bytes · 33 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET<br>functions/methods (1): L7 function GET() |
| `app/api/well-known/assetlinks/route.ts` | TypeScript · 1,010 bytes · 31 lines | Next.js App Router API route handler; see exported HTTP verbs and functions<br>exports: const dynamic, function GET<br>functions/methods (2): L7 function GET(); L11 callback (inline callback)(f) |
| `app/area-converter/layout.tsx` | TSX / React · 341 bytes · 5 lines | Next.js App Router layout and route metadata<br>exports: default function AreaConverterLayout<br>imports: @/components/seo/breadcrumb-json-ld<br>functions/methods (1): L3 function AreaConverterLayout({ children }: { children: React.ReactNode }) |
| `app/area-converter/page.tsx` | TSX / React · 10,541 bytes · 263 lines | Next.js App Router page and route implementation<br>exports: default function AreaConverterPage<br>imports: react, @/components/layout/header, @/components/layout/footer, lucide-react<br>functions/methods (14): L47 function AreaConverterPage(); L54 callback handleConvert(); L69 callback handleSwap(); L76 callback handleCopy(index: number); L81 callback (inline callback)(); L84 callback handleClear(); L110 callback (inline callback)(e); L116 callback (inline callback)(unit); L129 callback (inline callback)(e); L154 callback (inline callback)(e); L160 callback (inline callback)(unit); L196 callback (inline callback)(row, idx); L204 callback (inline callback)(); L212 callback (inline callback)(conv, cidx) |
| `app/associate/dashboard/loading.tsx` | TSX / React · 2,414 bytes · 60 lines | Next.js App Router loading/error boundary UI<br>exports: default function AssociateDashboardLoading<br>functions/methods (4): L1 function AssociateDashboardLoading(); L13 callback (inline callback)(i); L27 callback (inline callback)(i); L44 callback (inline callback)(i) |
| `app/associate/dashboard/page.tsx` | TSX / React · 7,116 bytes · 143 lines | Next.js App Router page and route implementation<br>exports: default function AssociateDashboardPage<br>imports: react, next/link, @/components/associate/agent-subscription-summary-card<br>functions/methods (7): L7 function AssociateDashboardPage(); L23 callback (inline callback)(); L24 callback async loadData(); L39 callback (inline callback)(sum: number, review: any); L42 callback (inline callback)(p: any); L43 callback (inline callback)(p: any); L50 callback (inline callback)(submission: any) |
| `app/associate/layout.tsx` | TSX / React · 974 bytes · 36 lines | Next.js App Router layout and route metadata<br>exports: const dynamic, const revalidate, const metadata, default function AssociateLayout<br>imports: react, next, next/navigation, @/lib/auth, @/components/dashboard/dashboard-layout-wrapper<br>functions/methods (1): L16 function async AssociateLayout({ children }: { children: React.ReactNode }) |
| `app/associate/leads/page.tsx` | TSX / React · 997 bytes · 32 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AssociateLeadsPage<br>imports: next, next/navigation, @/lib/auth, @/components/associate/leads-list<br>functions/methods (1): L11 function async AssociateLeadsPage() |
| `app/associate/login/page.tsx` | TSX / React · 1,830 bytes · 48 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AssociateLoginPage<br>imports: next, @/components/layout/header, @/components/layout/footer, @/components/forms/associate-login-form, next/link<br>functions/methods (1): L12 function AssociateLoginPage() |
| `app/associate/profile/page.tsx` | TSX / React · 7,420 bytes · 205 lines | Next.js App Router page and route implementation<br>exports: default function AssociateProfilePage<br>imports: react, @/components/ui/button, @/components/ui/input, react, lucide-react, @/components/account/profile-image-upload, @/components/account/delete-account-section<br>functions/methods (7): L13 function AssociateProfilePage(); L23 callback (inline callback)(); L24 callback async loadUser(); L44 callback async handleSubmit(e: React.FormEvent); L61 callback (inline callback)(prev: any); L141 callback (inline callback)(e); L159 callback (inline callback)(e) |
| `app/associate/properties/[id]/edit/page.tsx` | TSX / React · 1,802 bytes · 60 lines | Next.js App Router page and route implementation<br>exports: default function EditPropertyPage<br>imports: react, next/navigation, @/components/forms/property-form-wrapper, @/components/forms/property-form-multistep<br>functions/methods (3): L8 function EditPropertyPage({ params }: { params: Promise<{ id: string }> }); L14 callback (inline callback)(); L15 callback async loadProperty() |
| `app/associate/properties/new/page.tsx` | TSX / React · 475 bytes · 15 lines | Next.js App Router page and route implementation<br>exports: default function AssociateAddPropertyPage<br>imports: @/components/forms/property-form-wrapper, @/components/forms/property-form-multistep<br>functions/methods (1): L6 function AssociateAddPropertyPage() |
| `app/associate/properties/page.tsx` | TSX / React · 9,973 bytes · 243 lines | Next.js App Router page and route implementation<br>exports: default function AssociatePropertiesPage<br>imports: next/link, @/components/ui/button, lucide-react, react, @/lib/utils<br>functions/methods (14): L21 function getReviewStatus(p: any): "pending" \| "approved" \| "rejected"; L34 function AssociatePropertiesPage(); L39 callback (inline callback)(); L45 callback (inline callback)(); L46 callback async loadProperties(); L61 callback async handleDelete(id: string); L66 callback (inline callback)(p); L76 callback (inline callback)(p); L77 callback (inline callback)(p); L78 callback (inline callback)(p); L100 callback (inline callback)(); L122 callback (inline callback)(s); L158 callback (inline callback)(property); L207 callback (inline callback)() |
| `app/associate/register/page.tsx` | TSX / React · 1,568 bytes · 42 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AssociateRegisterPage<br>imports: next, @/components/layout/header, @/components/layout/footer, @/components/forms/associate-register-form, next/link<br>functions/methods (1): L12 function AssociateRegisterPage() |
| `app/associate/rera/[id]/page.tsx` | TSX / React · 10,985 bytes · 302 lines | Next.js App Router page and route implementation<br>exports: default function AssociateReraDetailPage<br>imports: next/link, react, @/components/ui/button, lucide-react, @/components/rera/rera-status-badge, @/components/forms/document-upload-field, @/lib/models<br>functions/methods (14): L25 function formatDate(d: string \| Date \| undefined); L36 function AssociateReraDetailPage({ params }: { params: Promise<{ id: string }> }); L45 callback async load(); L66 callback (inline callback)(); L71 callback async submitDocuments(); L77 callback (inline callback)(d); L78 callback (inline callback)(d); L122 callback (inline callback)(d); L123 callback (inline callback)(d); L199 callback (inline callback)(d); L205 callback (inline callback)(file); L206 callback (inline callback)(prev); L265 callback (inline callback)(ev, idx); L294 function Detail({ label, value }: { label: string; value?: string }) |
| `app/associate/rera/new/page.tsx` | TSX / React · 11,016 bytes · 321 lines | Next.js App Router page and route implementation<br>exports: default function NewAssociateReraRequestPage<br>imports: next/link, react, next/navigation, @/components/ui/button, lucide-react, @/lib/models<br>functions/methods (20): L23 function NewAssociateReraRequestPage(); L43 callback (inline callback)(); L44 callback async load(); L61 callback set(key: keyof typeof form, value: string); L62 callback (inline callback)(prev); L64 callback onSelectListing(id: string); L66 callback (inline callback)(x); L73 callback async handleSubmit(e: React.FormEvent); L150 callback (inline callback)(e); L155 callback (inline callback)(l); L177 callback (inline callback)(e); L189 callback (inline callback)(e); L193 callback (inline callback)(t); L207 callback (inline callback)(e); L220 callback (inline callback)(e); L233 callback (inline callback)(e); L246 callback (inline callback)(e); L265 callback (inline callback)(e); L277 callback (inline callback)(e); L289 callback (inline callback)(e) |
| `app/associate/rera/page.tsx` | TSX / React · 5,085 bytes · 129 lines | Next.js App Router page and route implementation<br>exports: default function AssociateReraPage<br>imports: next/link, react, @/components/ui/button, lucide-react, @/components/rera/rera-status-badge, @/lib/models<br>functions/methods (5): L10 function AssociateReraPage(); L14 callback (inline callback)(); L15 callback async load(); L32 callback (inline callback)(r); L92 callback (inline callback)(r) |
| `app/associate/reviews/page.tsx` | TSX / React · 5,135 bytes · 126 lines | Next.js App Router page and route implementation<br>exports: default function AssociateReviewsPage<br>imports: lucide-react, react<br>functions/methods (8): L6 function AssociateReviewsPage(); L10 callback (inline callback)(); L11 callback async loadReviews(); L26 callback (inline callback)(sum, r); L48 callback (inline callback)(_, i); L78 callback (inline callback)(r); L97 callback (inline callback)(review); L101 callback (inline callback)(_, i) |
| `app/associate/rewards/page.tsx` | TSX / React · 9,685 bytes · 61 lines | Next.js App Router page and route implementation<br>exports: default function AssociateRewardsPage<br>imports: react, swr, lucide-react, @/components/ui/badge, @/components/ui/button, @/components/ui/card, @/components/ui/input, @/components/ui/label, @/components/ui/textarea<br>functions/methods (15): L16 function AssociateRewardsPage(); L17 callback async (inline callback)(url: string); L28 function async submitTask(event: React.FormEvent<HTMLFormElement>); L43 function async requestRedemption(); L54 callback (inline callback)(submission); L54 callback (inline callback)(stat); L55 callback (inline callback)(task); L55 callback (inline callback)(); L56 callback (inline callback)(event); L56 callback (inline callback)(event); L56 callback (inline callback)(); L57 callback (inline callback)(submission); L57 callback (inline callback)(entry); L58 callback (inline callback)(e); L58 callback (inline callback)() |
| `app/associate/subscription/page.tsx` | TSX / React · 367 bytes · 11 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AssociateSubscriptionPage<br>imports: next, @/components/associate/agent-subscription-page<br>functions/methods (1): L9 function AssociateSubscriptionPage() |
| `app/associate/tickets/[id]/page.tsx` | TSX / React · 11,194 bytes · 292 lines | Next.js App Router page and route implementation<br>exports: default function AssociateTicketDetailPage<br>imports: next/link, react, next/navigation, @/components/ui/button, lucide-react<br>functions/methods (11): L31 function AssociateTicketDetailPage(); L39 callback (inline callback)(); L43 callback async loadTicket(); L55 callback async handleSubmitReply(e: React.FormEvent); L77 callback getPriorityColor(priority: string); L87 callback getStatusColor(status: string); L97 callback getStatusIcon(status: string); L112 callback getAllReplies(): Reply[]; L115 callback (inline callback)(a, b); L209 callback (inline callback)(reply); L265 callback (inline callback)(e) |
| `app/associate/tickets/page.tsx` | TSX / React · 11,713 bytes · 276 lines | Next.js App Router page and route implementation<br>exports: default function AssociateTicketsPage<br>imports: next/link, react, @/components/ui/button, lucide-react, @/components/ui/dialog<br>functions/methods (16): L15 function AssociateTicketsPage(); L27 callback (inline callback)(); L31 callback async loadTickets(); L43 callback async handleSubmit(e: React.FormEvent); L64 callback (inline callback)(t); L65 callback (inline callback)(t); L66 callback (inline callback)(t); L68 callback getStatusIcon(status: string); L82 callback getPriorityColor(priority: string); L117 callback (inline callback)(e); L128 callback (inline callback)(e); L142 callback (inline callback)(e); L156 callback (inline callback)(e); L164 callback (inline callback)(); L233 callback (inline callback)(); L240 callback (inline callback)(ticket) |
| `app/auth/login/loading.tsx` | TSX / React · 1,746 bytes · 52 lines | Next.js App Router loading/error boundary UI<br>exports: default function LoginLoading<br>functions/methods (1): L1 function LoginLoading() |
| `app/auth/login/page.tsx` | TSX / React · 1,797 bytes · 46 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function LoginPage<br>imports: next, @/components/forms/login-form, @/components/auth/list-land-promo, next/link<br>functions/methods (1): L11 function LoginPage() |
| `app/auth/register/loading.tsx` | TSX / React · 2,092 bytes · 62 lines | Next.js App Router loading/error boundary UI<br>exports: default function RegisterLoading<br>functions/methods (1): L1 function RegisterLoading() |
| `app/auth/register/page.tsx` | TSX / React · 1,205 bytes · 34 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function RegisterPage<br>imports: next, @/components/forms/register-form, next/link<br>functions/methods (1): L10 function RegisterPage() |
| `app/blog/_actions.ts` | TypeScript · 2,283 bytes · 91 lines | Next.js App Router route, metadata, styling, or platform file<br>exports: function getBlogPostBySlug, function getBlogPostById<br>imports: mongodb<br>functions/methods (2): L5 function async getBlogPostBySlug(slug: string, includeUnpublished: boolean = false); L44 function async getBlogPostById(id: string) |
| `app/blog/_components.tsx` | TSX / React · 2,285 bytes · 75 lines | Next.js App Router route, metadata, styling, or platform file<br>exports: function BlogPostPreview<br>imports: next/link, next/image, @/components/ui/button<br>functions/methods (2): L24 function BlogPostPreview({ blogPost }: BlogPostPreviewProps); L58 callback (inline callback)(tag) |
| `app/blog/[slug]/_blog-detail-components.tsx` | TSX / React · 7,112 bytes · 223 lines | Next.js App Router route, metadata, styling, or platform file<br>exports: function TableOfContents, function ShareButtons, function ReadingProgressBar, function BackToTop<br>imports: react, next/link, @/lib/utils, lucide-react<br>functions/methods (23): L30 function extractHeadings(html: string): TocItem[]; L35 callback (inline callback)(h, idx); L43 function TableOfContents({ content }: { content: string }); L47 callback (inline callback)(); L55 callback (inline callback)(h, idx); L63 callback (inline callback)(); L66 callback (inline callback)(entries); L77 callback (inline callback)({ id }); L81 callback (inline callback)(); L93 callback (inline callback)(h); L97 callback (inline callback)(e); L124 function ShareButtons({ title, url }: { title: string; url: string }); L127 callback handleCopy(); L130 callback (inline callback)(); L174 function ReadingProgressBar(); L177 callback (inline callback)(); L178 callback handleScroll(); L186 callback (inline callback)(); L202 function BackToTop(); L205 callback (inline callback)(); L206 callback handleScroll(); L208 callback (inline callback)(); L216 callback (inline callback)() |
| `app/blog/[slug]/loading.tsx` | TSX / React · 1,307 bytes · 31 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (1): L1 function Loading() |
| `app/blog/[slug]/page.tsx` | TSX / React · 21,911 bytes · 529 lines | Next.js App Router page and route implementation<br>exports: function generateMetadata, default function BlogPostPage<br>imports: next, next/navigation, mongodb, next/link, next/script, lucide-react, @/components/layout/header, @/components/layout/footer, @/lib/schema-markup-generator, ./_blog-detail-components<br>functions/methods (11): L54 function async getBlogPost(slug: string): Promise<BlogPost \| null>; L79 function async getRelatedPosts(category: string, currentSlug: string): Promise<BlogPost[]>; L107 callback (inline callback)(p); L117 function async generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata>; L153 function async BlogPostPage({ params }: { params: Promise<{ slug: string }> }); L180 callback (inline callback)(schema, index); L288 callback (inline callback)(tag: string); L316 callback (inline callback)(faq: any); L316 callback (inline callback)(faq: any, index: number); L421 callback (inline callback)(tag: string); L454 callback (inline callback)(related) |
| `app/blog/layout.tsx` | TSX / React · 145 bytes · 5 lines | Next.js App Router layout and route metadata<br>exports: default function BlogLayout<br>imports: @/styles/blog-content.css<br>functions/methods (1): L3 function BlogLayout({ children }: { children: React.ReactNode }) |
| `app/blog/loading.tsx` | TSX / React · 857 bytes · 21 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L7 callback (inline callback)(i) |
| `app/blog/page.tsx` | TSX / React · 1,345 bytes · 41 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function BlogPage<br>imports: next, @/components/blog/blog-grid, @/components/layout/header, @/components/layout/footer<br>functions/methods (1): L17 function BlogPage() |
| `app/blog/preview/[slug]/page.tsx` | TSX / React · 1,567 bytes · 48 lines | Next.js App Router page and route implementation<br>exports: default function BlogPostPreviewPage<br>imports: next/navigation, @/app/blog/_actions, @/app/blog/_components, @/lib/auth, @/components/layout/header, @/components/layout/footer<br>functions/methods (1): L10 function async BlogPostPreviewPage({ params }: { params: Promise<{ slug: string }> }) |
| `app/blogs/_actions.ts` | TypeScript · 2,713 bytes · 77 lines | Next.js App Router route, metadata, styling, or platform file<br>exports: function getBlogPostById, function getBlogPostBySlug<br>imports: @/lib/mongodb, mongodb<br>functions/methods (2): L6 function async getBlogPostById(id: string); L41 function async getBlogPostBySlug(slug: string) |
| `app/blogs/[slug]/_blog-detail-components.tsx` | TSX / React · 7,142 bytes · 223 lines | Next.js App Router route, metadata, styling, or platform file<br>exports: function TableOfContents, function ShareButtons, function ReadingProgressBar, function BackToTop<br>imports: react, next/link, @/lib/utils, lucide-react<br>functions/methods (23): L30 function extractHeadings(html: string): TocItem[]; L35 callback (inline callback)(h, idx); L43 function TableOfContents({ content }: { content: string }); L47 callback (inline callback)(); L55 callback (inline callback)(h, idx); L63 callback (inline callback)(); L66 callback (inline callback)(entries); L77 callback (inline callback)({ id }); L81 callback (inline callback)(); L93 callback (inline callback)(h); L97 callback (inline callback)(e); L124 function ShareButtons({ title, url }: { title: string; url: string }); L127 callback handleCopy(); L130 callback (inline callback)(); L174 function ReadingProgressBar(); L177 callback (inline callback)(); L178 callback handleScroll(); L186 callback (inline callback)(); L202 function BackToTop(); L205 callback (inline callback)(); L206 callback handleScroll(); L208 callback (inline callback)(); L216 callback (inline callback)() |
| `app/blogs/[slug]/loading.tsx` | TSX / React · 1,307 bytes · 31 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (1): L1 function Loading() |
| `app/blogs/[slug]/page.tsx` | TSX / React · 20,411 bytes · 506 lines | Next.js App Router page and route implementation<br>exports: function generateMetadata, default function BlogPostPage<br>imports: next, next/navigation, mongodb, next/link, next/script, lucide-react, @/components/layout/header, @/components/layout/footer, @/lib/schema-markup-generator, ./_blog-detail-components<br>functions/methods (10): L54 function async getBlogPost(slug: string): Promise<BlogPost \| null>; L79 function async getRelatedPosts(category: string, currentSlug: string): Promise<BlogPost[]>; L107 callback (inline callback)(p); L117 function async generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata>; L153 function async BlogPostPage({ params }: { params: Promise<{ slug: string }> }); L180 callback (inline callback)(schema, index); L287 callback (inline callback)(tag: string); L315 callback (inline callback)(faq: FAQItem); L315 callback (inline callback)(faq: FAQItem, index: number); L433 callback (inline callback)(related) |
| `app/blogs/layout.tsx` | TSX / React · 315 bytes · 5 lines | Next.js App Router layout and route metadata<br>exports: default function BlogsLayout<br>imports: @/components/seo/breadcrumb-json-ld<br>functions/methods (1): L3 function BlogsLayout({ children }: { children: React.ReactNode }) |
| `app/blogs/loading.tsx` | TSX / React · 857 bytes · 21 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L7 callback (inline callback)(i) |
| `app/blogs/page.tsx` | TSX / React · 17,618 bytes · 380 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function BlogsPage<br>imports: next, @/components/layout/header, @/components/layout/footer, next/link, next/image, lucide-react, @/lib/mongodb<br>functions/methods (9): L38 function async getBlogPosts(): Promise<BlogPost[]>; L47 callback (inline callback)(post); L66 function async getCategories(): Promise<string[]>; L76 function async BlogsPage({ searchParams, }: { searchParams: Promise<{ category?: string; search?: string }> }); L89 callback (inline callback)(post); L95 callback (inline callback)(post); L126 callback (inline callback)(category); L258 callback (inline callback)(post); L316 callback (inline callback)(post) |
| `app/builder/analytics/page.tsx` | TSX / React · 886 bytes · 24 lines | Next.js App Router page and route implementation<br>exports: default function AnalyticsPage<br>functions/methods (1): L3 function AnalyticsPage() |
| `app/builder/layout.tsx` | TSX / React · 889 bytes · 32 lines | Next.js App Router layout and route metadata<br>exports: const dynamic, const revalidate, const metadata, default function BuilderLayout<br>imports: react, next, next/navigation, @/lib/auth, @/components/dashboard/dashboard-layout-wrapper<br>functions/methods (1): L16 function async BuilderLayout({ children }: { children: React.ReactNode }) |
| `app/builder/leads/page.tsx` | TSX / React · 579 bytes · 18 lines | Next.js App Router page and route implementation<br>exports: default function LeadsPage<br>functions/methods (1): L3 function LeadsPage() |
| `app/builder/messages/page.tsx` | TSX / React · 507 bytes · 16 lines | Next.js App Router page and route implementation<br>exports: default function BuilderMessagesPage<br>functions/methods (1): L3 function BuilderMessagesPage() |
| `app/builder/page.tsx` | TSX / React · 2,884 bytes · 82 lines | Next.js App Router page and route implementation<br>exports: default function BuilderDashboard<br>imports: react, lucide-react<br>functions/methods (4): L6 function BuilderDashboard(); L16 callback (inline callback)(); L17 callback async loadData(); L32 callback StatCard({ icon: Icon, label, value }: any) |
| `app/builder/profile/page.tsx` | TSX / React · 3,619 bytes · 102 lines | Next.js App Router page and route implementation<br>exports: default function BuilderProfilePage<br>imports: react, react, @/components/ui/button, @/components/ui/input, lucide-react, @/components/account/profile-image-upload, @/components/account/delete-account-section<br>functions/methods (5): L11 function BuilderProfilePage(); L18 callback (inline callback)(); L19 callback async loadUser(); L39 callback async handleSubmit(e: React.FormEvent); L86 callback (inline callback)(e) |
| `app/builder/properties/page.tsx` | TSX / React · 947 bytes · 28 lines | Next.js App Router page and route implementation<br>exports: default function PropertiesPage<br>imports: next/link, @/components/ui/button, lucide-react<br>functions/methods (1): L7 function PropertiesPage() |
| `app/builder/settings/page.tsx` | TSX / React · 1,149 bytes · 30 lines | Next.js App Router page and route implementation<br>exports: default function BuilderSettingsPage<br>functions/methods (1): L3 function BuilderSettingsPage() |
| `app/buy/page.tsx` | TSX / React · 108 bytes · 5 lines | Next.js App Router page and route implementation<br>exports: default function BuyPage<br>imports: next/navigation<br>functions/methods (1): L3 function BuyPage() |
| `app/buyer/inquiries/page.tsx` | TSX / React · 11,469 bytes · 305 lines | Next.js App Router page and route implementation<br>exports: default function InquiriesPage<br>imports: react, next/link, lucide-react, @/components/ui/button, @/components/ui/badge, @/components/ui/input, @/components/ui/select<br>functions/methods (15): L70 function StatCard({ label, value, color }: { label: string; value: number; color: string }); L79 function InquiriesPage(); L89 callback async fetchLeads(pageNum = 1, status = "all"); L108 callback (inline callback)(); L112 callback (inline callback)(l); L122 callback formatDate(d: string); L135 callback (inline callback)(); L157 callback (inline callback)(e); L161 callback (inline callback)(v); L185 callback (inline callback)(); L204 callback (inline callback)(lead); L284 callback (inline callback)(); L284 callback (inline callback)(p); L295 callback (inline callback)(); L295 callback (inline callback)(p) |
| `app/buyer/layout.tsx` | TSX / React · 889 bytes · 32 lines | Next.js App Router layout and route metadata<br>exports: const dynamic, const revalidate, const metadata, default function BuyerLayout<br>imports: react, next, next/navigation, @/lib/auth, @/components/dashboard/dashboard-layout-wrapper<br>functions/methods (1): L16 function async BuyerLayout({ children }: { children: React.ReactNode }) |
| `app/buyer/loading.tsx` | TSX / React · 1,520 bytes · 39 lines | Next.js App Router loading/error boundary UI<br>exports: default function BuyerDashboardLoading<br>functions/methods (3): L1 function BuyerDashboardLoading(); L13 callback (inline callback)(i); L25 callback (inline callback)(i) |
| `app/buyer/messages/page.tsx` | TSX / React · 16,473 bytes · 498 lines | Next.js App Router page and route implementation<br>exports: default function MessagesPage<br>imports: react, lucide-react, @/components/ui/button, @/components/ui/input, @/components/ui/textarea, @/components/ui/label, @/lib/utils<br>functions/methods (29): L66 function formatDate(d: string); L74 function formatTime(d: string); L83 function ComposeDialog({ onClose, onCreated, }: { onClose: () => void onCreated: (thread: Thread) => void }); L95 callback async handleSubmit(e: React.FormEvent); L141 callback (inline callback)(e); L151 callback (inline callback)(e); L183 function ThreadPanel({ thread, onReply, }: { thread: Thread onReply: (threadId: string, content: string) => Promise<void> }); L195 callback (inline callback)(); L199 callback async handleSend(); L213 callback handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>); L248 callback (inline callback)(msg); L282 callback (inline callback)(e); L310 function MessagesPage(); L317 callback async fetchThreads(); L328 callback (inline callback)(t); L338 callback (inline callback)(); L343 callback handleCreated(thread: Thread); L344 callback (inline callback)(prev); L349 callback async handleReply(threadId: string, content: string); L360 callback (inline callback)(prev); L361 callback (inline callback)(t); L367 callback (inline callback)(prev); L378 callback (inline callback)(); L397 callback (inline callback)(); L423 callback (inline callback)(); L437 callback (inline callback)(t); L440 callback (inline callback)(m); L444 callback (inline callback)(); L473 callback (inline callback)() |
| `app/buyer/page.tsx` | TSX / React · 2,761 bytes · 71 lines | Next.js App Router page and route implementation<br>exports: default function BuyerDashboard<br>imports: react, lucide-react<br>functions/methods (4): L6 function BuyerDashboard(); L16 callback (inline callback)(); L17 callback async loadData(); L32 callback StatCard({ icon: Icon, label, value }: any) |
| `app/buyer/profile/page.tsx` | TSX / React · 7,260 bytes · 189 lines | Next.js App Router page and route implementation<br>exports: default function BuyerProfilePage<br>imports: react, react, @/components/ui/button, @/components/ui/input, lucide-react, @/components/account/profile-image-upload, @/components/account/delete-account-section<br>functions/methods (7): L13 function BuyerProfilePage(); L23 callback (inline callback)(); L24 callback async loadUser(); L44 callback async handleSubmit(e: React.FormEvent); L61 callback (inline callback)(prev: any); L124 callback (inline callback)(e); L142 callback (inline callback)(e) |
| `app/buyer/saved-properties/page.tsx` | TSX / React · 571 bytes · 16 lines | Next.js App Router page and route implementation<br>exports: default function SavedPropertiesPage<br>functions/methods (1): L3 function SavedPropertiesPage() |
| `app/buyer/settings/page.tsx` | TSX / React · 1,163 bytes · 30 lines | Next.js App Router page and route implementation<br>exports: default function SettingsPage<br>functions/methods (1): L3 function SettingsPage() |
| `app/career/loading.tsx` | TSX / React · 985 bytes · 24 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L8 callback (inline callback)(i) |
| `app/career/page.tsx` | TSX / React · 7,950 bytes · 189 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function CareerPage<br>imports: next, @/components/layout/header, @/components/layout/footer, @/components/ui/button, @/components/ui/card, next/link, lucide-react<br>functions/methods (3): L77 function CareerPage(); L107 callback (inline callback)(benefit, index); L133 callback (inline callback)(position, index) |
| `app/contact/layout.tsx` | TSX / React · 315 bytes · 5 lines | Next.js App Router layout and route metadata<br>exports: default function BlogsLayout<br>imports: @/components/seo/breadcrumb-json-ld<br>functions/methods (1): L3 function BlogsLayout({ children }: { children: React.ReactNode }) |
| `app/contact/loading.tsx` | TSX / React · 691 bytes · 19 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (1): L1 function Loading() |
| `app/contact/page.tsx` | TSX / React · 5,308 bytes · 117 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function ContactPage<br>imports: next, lucide-react, @/components/layout/header, @/components/forms/contact-form<br>functions/methods (2): L19 function ContactPage(); L105 callback (inline callback)(item, idx) |
| `app/cookie-policy/page.tsx` | TSX / React · 7,172 bytes · 138 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function CookiePolicyPage<br>imports: next, @/components/layout/header, @/components/layout/footer<br>functions/methods (1): L14 function CookiePolicyPage() |
| `app/dashboard/layout.tsx` | TSX / React · 1,084 bytes · 38 lines | Next.js App Router layout and route metadata<br>exports: const dynamic, const revalidate, const metadata, default function DashboardLayout<br>imports: react, next, next/navigation, @/lib/auth, @/components/dashboard/dashboard-layout-wrapper<br>functions/methods (1): L16 function async DashboardLayout({ children }: { children: React.ReactNode }) |
| `app/dashboard/page.tsx` | TSX / React · 482 bytes · 23 lines | Next.js App Router page and route implementation<br>exports: const dynamic, default function DashboardPage<br>imports: next/navigation, @/lib/auth<br>functions/methods (1): L6 function async DashboardPage() |
| `app/developer/[slug]/loading.tsx` | TSX / React · 1,949 bytes · 53 lines | Next.js App Router loading/error boundary UI<br>exports: default function DeveloperDetailLoading<br>functions/methods (3): L1 function DeveloperDetailLoading(); L18 callback (inline callback)(i); L39 callback (inline callback)(i) |
| `app/developer/[slug]/page.tsx` | TSX / React · 13,947 bytes · 379 lines | Next.js App Router page and route implementation<br>exports: default function DeveloperDetailPage<br>imports: react, next/navigation, next/link, lucide-react, @/components/ui/button, @/components/ui/skeleton, @/lib/utils<br>functions/methods (12): L59 function DeveloperDetailPage(); L72 callback (inline callback)(); L73 callback async fetchDeveloper(); L99 callback handlePageChange(newPage: number); L115 callback (inline callback)(i); L227 callback (inline callback)(property); L243 callback (inline callback)(e); L264 callback (inline callback)(e); L321 callback (inline callback)(); L329 callback (inline callback)(_, i); L346 callback (inline callback)(); L361 callback (inline callback)() |
| `app/developers/layout.tsx` | TSX / React · 680 bytes · 23 lines | Next.js App Router layout and route metadata<br>exports: const metadata, default function DevelopersLayout<br>imports: next<br>functions/methods (1): L17 function DevelopersLayout({ children, }: { children: React.ReactNode }) |
| `app/developers/loading.tsx` | TSX / React · 1,726 bytes · 43 lines | Next.js App Router loading/error boundary UI<br>exports: default function DevelopersLoading<br>functions/methods (2): L1 function DevelopersLoading(); L16 callback (inline callback)(i) |
| `app/developers/page.tsx` | TSX / React · 5,033 bytes · 145 lines | Next.js App Router page and route implementation<br>exports: default function DevelopersPage<br>imports: react, next/link, lucide-react, @/components/ui/input, @/components/ui/skeleton, @/lib/utils, next/navigation<br>functions/methods (7): L20 function DevelopersPage(); L26 callback (inline callback)(); L27 callback async fetchDevelopers(); L44 callback (inline callback)(dev); L55 callback (inline callback)(i); L86 callback (inline callback)(e); L94 callback (inline callback)(developer) |
| `app/disclaimer/page.tsx` | TSX / React · 7,871 bytes · 122 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function DisclaimerPage<br>imports: next, @/components/layout/header, @/components/layout/footer<br>functions/methods (1): L10 function DisclaimerPage() |
| `app/farms/page.tsx` | TSX / React · 13,389 bytes · 307 lines | Next.js App Router page and route implementation<br>exports: default function FarmsPage<br>imports: react, next/link, @/components/layout/header, @/components/layout/footer, lucide-react<br>functions/methods (9): L108 function FarmsPage(); L112 callback (inline callback)(farm); L142 callback (inline callback)(e); L146 callback (inline callback)(type); L155 callback (inline callback)(e); L173 callback (inline callback)(farm); L180 callback (inline callback)(benefit); L200 callback (inline callback)(farm); L232 callback (inline callback)(facility) |
| `app/favorites/loading.tsx` | TSX / React · 875 bytes · 21 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L7 callback (inline callback)(i) |
| `app/favorites/page.tsx` | TSX / React · 4,622 bytes · 125 lines | Next.js App Router page and route implementation<br>exports: default function FavoritesPage<br>imports: @/components/layout/header, @/components/layout/footer, react, next/link, lucide-react, @/lib/utils, @/components/ui/button<br>functions/methods (7): L24 function FavoritesPage(); L28 callback (inline callback)(); L29 callback async loadFavorites(); L45 callback removeFavorite(propertyId: string); L46 callback (inline callback)(p); L75 callback (inline callback)(property); L110 callback (inline callback)() |
| `app/find-agent/page.tsx` | TSX / React · 10,745 bytes · 240 lines | Next.js App Router page and route implementation<br>exports: default function FindAssociatePage<br>imports: react, swr, lucide-react, @/components/layout/header, @/components/layout/footer, @/components/ui/user-avatar<br>functions/methods (10): L19 callback fetcher(url: string); L19 callback (inline callback)(r); L21 function formatJoined(date: string \| null); L30 function digitsOnly(phone: string); L34 function FindAssociatePage(); L41 callback (inline callback)(associate); L71 callback (inline callback)(e); L81 callback (inline callback)(e); L88 callback (inline callback)(); L116 callback (inline callback)(associate) |
| `app/find-associate/layout.tsx` | TSX / React · 337 bytes · 5 lines | Next.js App Router layout and route metadata<br>exports: default function FindAssociateLayout<br>imports: @/components/seo/breadcrumb-json-ld<br>functions/methods (1): L3 function FindAssociateLayout({ children }: { children: React.ReactNode }) |
| `app/find-associate/page.tsx` | TSX / React · 10,104 bytes · 234 lines | Next.js App Router page and route implementation<br>exports: default function FindAssociatePage<br>imports: react, swr, lucide-react, @/components/layout/header, @/components/layout/footer, @/components/ui/user-avatar<br>functions/methods (11): L19 callback fetcher(url: string); L19 callback (inline callback)(r); L21 function formatJoined(date: string \| null); L30 function digitsOnly(phone: string); L34 function FindAssociatePage(); L41 callback (inline callback)(associate); L71 callback (inline callback)(e); L81 callback (inline callback)(e); L88 callback (inline callback)(); L116 callback (inline callback)(associate); L192 callback (inline callback)() |
| `app/globals.css` | CSS · 41,769 bytes | Next.js App Router route, metadata, styling, or platform file |
| `app/grievance-redressal/page.tsx` | TSX / React · 7,878 bytes · 140 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function GrievanceRedressalPage<br>imports: next, @/components/layout/header, @/components/layout/footer<br>functions/methods (1): L14 function GrievanceRedressalPage() |
| `app/gurugram-master-plan/page.tsx` | TSX / React · 10,371 bytes · 224 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function GurugramMasterPlanPage<br>imports: next, @/components/layout/header, @/components/layout/footer, @/components/ui/button, @/components/ui/card, next/link, lucide-react<br>functions/methods (3): L75 function GurugramMasterPlanPage(); L115 callback (inline callback)(highlight, index); L141 callback (inline callback)(zone, index) |
| `app/how-it-works/layout.tsx` | TSX / React · 330 bytes · 5 lines | Next.js App Router layout and route metadata<br>exports: default function HowItWorksLayout<br>imports: @/components/seo/breadcrumb-json-ld<br>functions/methods (1): L3 function HowItWorksLayout({ children }: { children: React.ReactNode }) |
| `app/how-it-works/page.tsx` | TSX / React · 8,376 bytes · 193 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function HowItWorksPage<br>imports: next, next/script, next/link, lucide-react, @/components/ui/button, @/lib/schema-markup-generator<br>functions/methods (3): L70 function HowItWorksPage(); L85 callback (inline callback)(schema, index); L135 callback (inline callback)(stage) |
| `app/investments/layout.tsx` | TSX / React · 329 bytes · 5 lines | Next.js App Router layout and route metadata<br>exports: default function InvestmentsLayout<br>imports: @/components/seo/breadcrumb-json-ld<br>functions/methods (1): L3 function InvestmentsLayout({ children }: { children: React.ReactNode }) |
| `app/investments/page.tsx` | TSX / React · 13,706 bytes · 321 lines | Next.js App Router page and route implementation<br>exports: default function InvestmentsPage<br>imports: react, next/link, @/components/layout/header, @/components/layout/footer, lucide-react<br>functions/methods (11): L69 function InvestmentsPage(); L81 callback (inline callback)(_, i); L104 callback (inline callback)(option, idx); L107 callback (inline callback)(); L125 callback (inline callback)(highlight); L149 callback (inline callback)(e); L167 callback (inline callback)(e); L178 callback (inline callback)(y); L181 callback (inline callback)(); L244 callback (inline callback)(data); L292 callback (inline callback)(item, idx) |
| `app/land/[type]/page.tsx` | TSX / React · 6,967 bytes · 171 lines | Next.js App Router page and route implementation<br>exports: function generateStaticParams, function generateMetadata, default function LandTypePage<br>imports: next, next/link, next/navigation, lucide-react, @/components/layout/header, @/components/layout/footer, @/components/land/land-type-listings, @/lib/land-types-content, @/lib/category-faqs, @/components/land/category-faqs, @/components/seo/breadcrumb-json-ld<br>functions/methods (8): L17 function generateStaticParams(); L18 callback (inline callback)(t); L21 function async generateMetadata({ params }: PageProps): Promise<Metadata>; L40 function async LandTypePage({ params }: PageProps); L48 callback (inline callback)(t); L108 callback (inline callback)(h); L144 callback (inline callback)(faq); L153 callback (inline callback)(t) |
| `app/layout.tsx` | TSX / React · 9,373 bytes · 265 lines | Next.js App Router layout and route metadata<br>exports: const revalidate, const metadata, const viewport, default function RootLayout<br>imports: react, next, next/font/google, next/script, next/headers, ./globals.css, @/components/layout/frontend-layout, @/components/layout/custom-head-tags, @/components/layout/head-tags-injector, @/lib/median-server<br>functions/methods (1): L102 function async RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) |
| `app/loading.tsx` | TSX / React · 1,319 bytes · 34 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L14 callback (inline callback)(i) |
| `app/location/[slug]/loading.tsx` | TSX / React · 2,049 bytes · 55 lines | Next.js App Router loading/error boundary UI<br>exports: default function LocationDetailLoading<br>functions/methods (3): L1 function LocationDetailLoading(); L17 callback (inline callback)(i); L35 callback (inline callback)(i) |
| `app/location/[slug]/page.tsx` | TSX / React · 24,960 bytes · 609 lines | Next.js App Router page and route implementation<br>exports: default function LocationPage<br>imports: react, next/navigation, next/link, lucide-react, @/components/ui/button, @/components/ui/skeleton, @/lib/utils, @/components/property/location-hero, @/components/property/luxury-property-card, @/components/layout/header, @/components/layout/footer<br>functions/methods (36): L94 function LocationPage(); L121 callback buildQueryString(); L123 callback (inline callback)([key, value]); L130 callback (inline callback)(); L131 callback async fetchData(); L152 callback updateFilter(key: string, value: string); L158 callback (inline callback)([k, v]); L166 callback clearAllFilters(); L180 callback handlePageChange(page: number); L182 callback (inline callback)([k, v]); L190 callback handleViewChange(mode: 'grid' \| 'list'); L193 callback (inline callback)([k, v]); L202 callback (inline callback)([key, value]); L216 callback (inline callback)(_, i); L282 callback (inline callback)(e); L286 callback (inline callback)(t); L293 callback (inline callback)(e); L297 callback (inline callback)(s); L304 callback (inline callback)(e); L317 callback (inline callback)(b); L326 callback (inline callback)(); L363 callback (inline callback)(e); L367 callback (inline callback)(s); L378 callback (inline callback)(e); L388 callback (inline callback)(e); L398 callback (inline callback)(e); L410 callback (inline callback)(e); L419 callback (inline callback)(e); L442 callback (inline callback)(); L453 callback (inline callback)(); L474 callback (inline callback)(property); L480 callback (inline callback)(property); L536 callback (inline callback)(); L546 callback (inline callback)(_, i); L561 callback (inline callback)(); L577 callback (inline callback)() |
| `app/manifest.ts` | TypeScript · 2,703 bytes · 82 lines | Next.js App Router route, metadata, styling, or platform file<br>exports: default function manifest<br>imports: next<br>functions/methods (1): L3 function manifest(): MetadataRoute.Manifest |
| `app/messages/page.tsx` | TSX / React · 2,050 bytes · 72 lines | Next.js App Router page and route implementation<br>exports: default function MessagesPage<br>imports: @/components/layout/header, @/components/layout/footer, react, lucide-react, next/link, @/components/ui/button<br>functions/methods (3): L10 function MessagesPage(); L14 callback (inline callback)(); L15 callback async checkAuth() |
| `app/news/[slug]/loading.tsx` | TSX / React · 1,098 bytes · 28 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (1): L1 function Loading() |
| `app/news/[slug]/page.tsx` | TSX / React · 4,155 bytes · 126 lines | Next.js App Router page and route implementation<br>exports: default function NewsDetailPage<br>imports: next/link, @/components/layout/header, @/components/layout/footer, lucide-react, react, @/components/ui/button<br>functions/methods (4): L11 function NewsDetailPage({ params }: { params: { slug: string } }); L15 callback (inline callback)(); L16 callback async loadArticle(); L100 callback (inline callback)(i) |
| `app/news/layout.tsx` | TSX / React · 640 bytes · 23 lines | Next.js App Router layout and route metadata<br>exports: const metadata, default function NewsLayout<br>imports: next<br>functions/methods (1): L17 function NewsLayout({ children, }: { children: React.ReactNode }) |
| `app/news/loading.tsx` | TSX / React · 857 bytes · 21 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L7 callback (inline callback)(i) |
| `app/news/page.tsx` | TSX / React · 3,865 bytes · 102 lines | Next.js App Router page and route implementation<br>exports: default function NewsPage<br>imports: next/link, lucide-react, react, @/components/layout/header, @/components/layout/footer<br>functions/methods (8): L9 function NewsPage(); L14 callback (inline callback)(); L15 callback async loadNews(); L46 callback (inline callback)(article); L82 callback (inline callback)(); L82 callback (inline callback)(p); L90 callback (inline callback)(); L90 callback (inline callback)(p) |
| `app/office-space/[slug]/loading.tsx` | TSX / React · 1,978 bytes · 48 lines | Next.js App Router loading/error boundary UI<br>exports: default function OfficeSpaceDetailLoading<br>functions/methods (2): L1 function OfficeSpaceDetailLoading(); L26 callback (inline callback)(i) |
| `app/office-space/[slug]/page.tsx` | TSX / React · 7,646 bytes · 273 lines | Next.js App Router page and route implementation<br>exports: function generateMetadata, default function OfficeSpaceDetailPage<br>imports: next, next/navigation, mongodb, next/script, @/components/property/office-space-detail-client, @/lib/utils<br>functions/methods (4): L44 function async getOfficeSpace(slug: string): Promise<Property \| null>; L93 function async getDeveloper(developerId: string); L120 function async generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata>; L192 function async OfficeSpaceDetailPage({ params }: { params: Promise<{ slug: string }> }) |
| `app/office-space/page.tsx` | TSX / React · 21,538 bytes · 505 lines | Next.js App Router page and route implementation<br>exports: default function OfficeSpacePage<br>imports: react, next/navigation, next/link, lucide-react, @/components/layout/header, @/components/layout/footer, @/components/property/luxury-property-card, swr, @/lib/utils<br>functions/methods (27): L24 callback fetcher(url: string); L24 callback (inline callback)(res); L94 function OfficeSpacePage(); L109 callback buildQueryString(); L114 callback (inline callback)(type); L136 callback updateFilter(key: string, value: string); L146 callback clearFilters(); L153 callback getOfficeInfo(property: Property); L225 callback (inline callback)(); L245 callback (inline callback)(e); L248 callback (inline callback)(opt); L258 callback (inline callback)(); L271 callback (inline callback)(); L296 callback (inline callback)(e); L299 callback (inline callback)(opt); L312 callback (inline callback)(e); L315 callback (inline callback)(opt); L328 callback (inline callback)(e); L331 callback (inline callback)(opt); L345 callback (inline callback)(e); L371 callback (inline callback)(_, i); L393 callback (inline callback)(property); L399 callback (inline callback)(t); L407 callback (inline callback)(property); L419 callback (inline callback)(t); L466 callback (inline callback)(g); L471 callback (inline callback)(f) |
| `app/offline/page.tsx` | TSX / React · 1,769 bytes · 57 lines | Next.js App Router page and route implementation<br>exports: default function OfflinePage<br>imports: react, lucide-react, @/components/ui/button<br>functions/methods (8): L7 function OfflinePage(); L10 callback (inline callback)(); L11 callback update(); L15 callback (inline callback)(); L22 callback (inline callback)(); L24 callback (inline callback)(); L27 callback (inline callback)(); L48 callback (inline callback)() |
| `app/page.tsx` | TSX / React · 6,218 bytes · 179 lines | Next.js App Router page and route implementation<br>exports: const revalidate, default function Home<br>imports: react, next/headers, next/dynamic, @/components/mobile/median-home-page, @/components/sections/banner-image, @/lib/median-server<br>functions/methods (36): L9 callback (inline callback)(); L11 callback loading(); L36 callback (inline callback)(); L38 callback loading(); L41 callback (inline callback)(); L43 callback loading(); L46 callback (inline callback)(); L47 callback (inline callback)(); L49 callback (inline callback)(); L51 callback loading(); L54 callback (inline callback)(); L56 callback loading(); L59 callback (inline callback)(); L61 callback loading(); L64 callback (inline callback)(); L66 callback loading(); L69 callback (inline callback)(); L71 callback loading(); L74 callback (inline callback)(); L76 callback loading(); L79 callback (inline callback)(); L81 callback loading(); L84 callback (inline callback)(); L86 callback loading(); L89 callback (inline callback)(); L91 callback loading(); L94 callback (inline callback)(); L96 callback loading(); L99 callback (inline callback)(); L101 callback loading(); L104 callback (inline callback)(); L106 callback loading(); L109 callback (inline callback)(); L111 callback loading(); L114 function WebsiteHome(); L174 function async Home() |
| `app/portfolio/page.tsx` | TSX / React · 7,118 bytes · 184 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function PortfolioPage<br>imports: next, @/components/layout/header, @/components/layout/footer, @/components/ui/card<br>functions/methods (4): L86 function PortfolioPage(); L106 callback (inline callback)(cat); L122 callback (inline callback)(project); L148 callback (inline callback)(_, i) |
| `app/pricing/layout.tsx` | TSX / React · 324 bytes · 5 lines | Next.js App Router layout and route metadata<br>exports: default function PricingLayout<br>imports: @/components/seo/breadcrumb-json-ld<br>functions/methods (1): L3 function PricingLayout({ children }: { children: React.ReactNode }) |
| `app/pricing/page.tsx` | TSX / React · 13,258 bytes · 265 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function PricingPage<br>imports: next, next/script, next/link, lucide-react, @/components/ui/button, @/lib/schema-markup-generator<br>functions/methods (5): L23 function PricingPage(); L38 callback (inline callback)(schema, index); L134 callback (inline callback)(item); L162 callback (inline callback)(item); L214 callback (inline callback)(item) |
| `app/privacy-policy/page.tsx` | TSX / React · 9,741 bytes · 198 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function PrivacyPolicyPage<br>imports: next<br>functions/methods (1): L11 function PrivacyPolicyPage() |
| `app/properties/[id]/loading.tsx` | TSX / React · 2,261 bytes · 52 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L40 callback (inline callback)(i) |
| `app/properties/[id]/page.tsx` | TSX / React · 6,913 bytes · 228 lines | Next.js App Router page and route implementation<br>exports: function generateMetadata, default function PropertyDetailPage<br>imports: next, next/navigation, mongodb, next/script, @/lib/schema-markup-generator, @/components/property/property-detail-client, @/components/property/listing-under-review, @/lib/auth, @/lib/utils<br>functions/methods (5): L48 function async getProperty(id: string): Promise<Property \| null>; L79 function async getDeveloper(developerId: string); L106 function async generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata>; L176 function async PropertyDetailPage({ params }: { params: Promise<{ id: string }> }); L209 callback (inline callback)(schema, index) |
| `app/properties/[id]/preview/page.tsx` | TSX / React · 1,812 bytes · 65 lines | Next.js App Router page and route implementation<br>exports: default function PropertyPreviewPage<br>imports: react, next/navigation<br>functions/methods (3): L16 function PropertyPreviewPage(); L21 callback (inline callback)(); L22 callback async fetchProperty() |
| `app/properties/[id]/reviews/page.tsx` | TSX / React · 3,751 bytes · 120 lines | Next.js App Router page and route implementation<br>exports: default function PropertyReviewPage<br>imports: react, @/components/layout/header, @/components/layout/footer, react, next/navigation, @/components/ui/button, @/components/ui/textarea, lucide-react<br>functions/methods (9): L13 function PropertyReviewPage({ params }: { params: { id: string } }); L20 callback (inline callback)(); L21 callback async checkAuth(); L40 callback (inline callback)(); L48 callback async handleSubmit(e: React.FormEvent); L81 callback (inline callback)(star); L85 callback (inline callback)(); L99 callback (inline callback)(e); L107 callback (inline callback)() |
| `app/properties/category/[category]/page.tsx` | TSX / React · 4,063 bytes · 98 lines | Next.js App Router page and route implementation<br>exports: default function CategoryPage<br>imports: @/components/layout/header, @/components/layout/footer, next/link, lucide-react, react, @/lib/utils<br>functions/methods (4): L10 function CategoryPage({ params }: { params: { category: string } }); L14 callback (inline callback)(); L15 callback async loadProperties(); L48 callback (inline callback)(prop) |
| `app/properties/commercial/[slug]/loading.tsx` | TSX / React · 2,105 bytes · 47 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L27 callback (inline callback)(i) |
| `app/properties/commercial/[slug]/page.tsx` | TSX / React · 7,735 bytes · 262 lines | Next.js App Router page and route implementation<br>exports: function generateMetadata, default function PropertyDetailPage<br>imports: next, next/navigation, mongodb, @/lib/schema-markup-generator, @/components/property/property-detail-client, @/lib/utils, next/script<br>functions/methods (8): L19 function getPropertyTypeSlug(propertyType: string): string; L24 callback (inline callback)(t); L31 function getPropertyTypeDisplayName(slug: string): string; L78 function async getProperty(slug: string): Promise<Property \| null>; L109 function async getDeveloper(developerId: string); L138 function async generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata>; L209 function async PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }); L238 callback (inline callback)(schema, index) |
| `app/properties/commercial/page.tsx` | TSX / React · 11,424 bytes · 255 lines | Next.js App Router page and route implementation<br>exports: default function CommercialPropertiesPage<br>imports: react, next/navigation, next/link, lucide-react, @/components/layout/header, @/components/layout/footer, @/components/property/luxury-property-card, swr, @/lib/utils<br>functions/methods (12): L13 callback fetcher(url: string); L13 callback (inline callback)(res); L47 function CommercialPropertiesPage(); L57 callback buildQueryString(); L58 callback (inline callback)(type); L130 callback (inline callback)(e); L137 callback (inline callback)(opt); L147 callback (inline callback)(); L161 callback (inline callback)(); L184 callback (inline callback)(_, i); L201 callback (inline callback)(property); L207 callback (inline callback)(property) |
| `app/properties/layout.tsx` | TSX / React · 1,068 bytes · 24 lines | Next.js App Router layout and route metadata<br>exports: const metadata, default function PropertiesLayout<br>imports: next, @/components/seo/breadcrumb-json-ld<br>functions/methods (1): L18 function PropertiesLayout({ children, }: { children: React.ReactNode }) |
| `app/properties/loading.tsx` | TSX / React · 2,105 bytes · 47 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L27 callback (inline callback)(i) |
| `app/properties/location/[state]/page.tsx` | TSX / React · 5,274 bytes · 125 lines | Next.js App Router page and route implementation<br>exports: default function LocationPage<br>imports: @/components/layout/header, @/components/layout/footer, next/link, lucide-react, @/components/ui/button, react, @/lib/utils<br>functions/methods (8): L11 function LocationPage({ params }: { params: { state: string } }); L16 callback (inline callback)(); L17 callback async loadProperties(); L56 callback (inline callback)(property); L109 callback (inline callback)(); L109 callback (inline callback)(p); L115 callback (inline callback)(); L115 callback (inline callback)(p) |
| `app/properties/page.tsx` | TSX / React · 25,814 bytes · 620 lines | Next.js App Router page and route implementation<br>exports: default function PropertiesPage<br>imports: next/link, next/navigation, lucide-react, @/components/ui/button, react, swr, @/lib/utils, @/lib/models<br>functions/methods (47): L15 callback fetcher(url: string); L15 callback (inline callback)(res); L37 callback (inline callback)(u); L48 callback (inline callback)(t); L76 function PropertyCard({ property }: { property: Property }); L116 callback (inline callback)(e); L170 function PropertiesContent(); L202 callback (inline callback)(); L204 callback (inline callback)([key, value]); L221 callback updateFilter(key: string, value: string); L225 callback (inline callback)([k, v]); L230 callback clearAllFilters(); L232 callback (inline callback)(k); L238 callback goToPage(newPage: number); L240 callback (inline callback)([k, v]); L246 callback (inline callback)([key, value]); L250 callback toggleBoolFilter(key: string, current: string); L284 callback (inline callback)(e); L293 callback (inline callback)(e); L297 callback (inline callback)(t); L306 callback (inline callback)(e); L314 callback (inline callback)(b); L321 callback (inline callback)(e); L325 callback (inline callback)(u); L333 callback (inline callback)(); L365 callback (inline callback)(e); L375 callback (inline callback)(e); L392 callback (inline callback)(e); L402 callback (inline callback)(e); L415 callback (inline callback)(e); L419 callback (inline callback)(o); L428 callback (inline callback)(e); L432 callback (inline callback)(f); L446 callback (inline callback)(e); L463 callback (inline callback)({ key, label }); L466 callback (inline callback)(); L506 callback (inline callback)(e); L509 callback (inline callback)(s); L515 callback (inline callback)(); L521 callback (inline callback)(); L533 callback (inline callback)(i); L559 callback (inline callback)(property); L570 callback (inline callback)(); L577 callback (inline callback)(_, i); L586 callback (inline callback)(); L601 callback (inline callback)(); L614 function PropertiesPage() |
| `app/properties/plots/[slug]/loading.tsx` | TSX / React · 2,105 bytes · 47 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L27 callback (inline callback)(i) |
| `app/properties/plots/[slug]/page.tsx` | TSX / React · 7,730 bytes · 262 lines | Next.js App Router page and route implementation<br>exports: function generateMetadata, default function PropertyDetailPage<br>imports: next, next/navigation, mongodb, @/lib/schema-markup-generator, @/components/property/property-detail-client, @/lib/utils, next/script<br>functions/methods (8): L19 function getPropertyTypeSlug(propertyType: string): string; L24 callback (inline callback)(t); L31 function getPropertyTypeDisplayName(slug: string): string; L78 function async getProperty(slug: string): Promise<Property \| null>; L109 function async getDeveloper(developerId: string); L138 function async generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata>; L209 function async PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }); L238 callback (inline callback)(schema, index) |
| `app/properties/plots/page.tsx` | TSX / React · 11,534 bytes · 256 lines | Next.js App Router page and route implementation<br>exports: default function PlotsPropertiesPage<br>imports: react, next/navigation, next/link, lucide-react, @/components/layout/header, @/components/layout/footer, @/components/property/luxury-property-card, swr, @/lib/utils<br>functions/methods (12): L13 callback fetcher(url: string); L13 callback (inline callback)(res); L47 function PlotsPropertiesPage(); L57 callback buildQueryString(); L58 callback (inline callback)(type); L131 callback (inline callback)(e); L138 callback (inline callback)(opt); L148 callback (inline callback)(); L162 callback (inline callback)(); L185 callback (inline callback)(_, i); L202 callback (inline callback)(property); L208 callback (inline callback)(property) |
| `app/properties/residential/[slug]/loading.tsx` | TSX / React · 2,105 bytes · 47 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L27 callback (inline callback)(i) |
| `app/properties/residential/[slug]/page.tsx` | TSX / React · 7,736 bytes · 262 lines | Next.js App Router page and route implementation<br>exports: function generateMetadata, default function PropertyDetailPage<br>imports: next, next/navigation, mongodb, @/lib/schema-markup-generator, @/components/property/property-detail-client, @/lib/utils, next/script<br>functions/methods (8): L19 function getPropertyTypeSlug(propertyType: string): string; L24 callback (inline callback)(t); L31 function getPropertyTypeDisplayName(slug: string): string; L78 function async getProperty(slug: string): Promise<Property \| null>; L109 function async getDeveloper(developerId: string); L138 function async generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata>; L209 function async PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }); L238 callback (inline callback)(schema, index) |
| `app/properties/residential/page.tsx` | TSX / React · 11,422 bytes · 252 lines | Next.js App Router page and route implementation<br>exports: default function ResidentialPropertiesPage<br>imports: react, next/navigation, next/link, lucide-react, @/components/layout/header, @/components/layout/footer, @/components/property/luxury-property-card, swr, @/lib/utils<br>functions/methods (12): L13 callback fetcher(url: string); L13 callback (inline callback)(res); L47 function ResidentialPropertiesPage(); L57 callback buildQueryString(); L58 callback (inline callback)(type); L127 callback (inline callback)(e); L134 callback (inline callback)(opt); L144 callback (inline callback)(); L158 callback (inline callback)(); L181 callback (inline callback)(_, i); L198 callback (inline callback)(property); L204 callback (inline callback)(property) |
| `app/properties/types/[type]/page.tsx` | TSX / React · 13,406 bytes · 321 lines | Next.js App Router page and route implementation<br>exports: default function PropertyTypePage<br>imports: react, next/navigation, next/link, lucide-react, @/components/layout/header, @/components/layout/footer, @/components/property/luxury-property-card, swr, @/lib/utils<br>functions/methods (13): L13 callback fetcher(url: string); L13 callback (inline callback)(res); L111 function PropertyTypePage(); L123 callback buildQueryString(); L131 callback (inline callback)(v); L138 callback (inline callback)(c); L196 callback (inline callback)(e); L203 callback (inline callback)(opt); L213 callback (inline callback)(); L227 callback (inline callback)(); L250 callback (inline callback)(_, i); L267 callback (inline callback)(property); L273 callback (inline callback)(property) |
| `app/property-management/page.tsx` | TSX / React · 14,329 bytes · 350 lines | Next.js App Router page and route implementation<br>exports: default function PropertyManagementPage<br>imports: react, lucide-react, @/components/layout/header, @/components/layout/footer<br>functions/methods (9): L110 function PropertyManagementPage(); L119 callback handleInputChange(e:any); L121 callback (inline callback)(prev); L124 callback handleSubmit(e:any); L148 callback (inline callback)(service); L215 callback (inline callback)(plan); L226 callback (inline callback)(feature); L243 callback (inline callback)(study); L262 callback (inline callback)(step) |
| `app/quote/page.tsx` | TSX / React · 1,434 bytes · 43 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function QuotePage<br>imports: next, @/components/layout/header, @/components/layout/footer, @/components/forms/quote-form<br>functions/methods (1): L19 function QuotePage() |
| `app/robots.ts` | TypeScript · 520 bytes · 26 lines | Next.js App Router route, metadata, styling, or platform file<br>exports: default function robots<br>imports: next<br>functions/methods (1): L3 function robots(): MetadataRoute.Robots |
| `app/search/loading.tsx` | TSX / React · 1,869 bytes · 52 lines | Next.js App Router loading/error boundary UI<br>exports: default function SearchLoading<br>imports: @/components/ui/skeleton<br>functions/methods (3): L3 function SearchLoading(); L16 callback (inline callback)(i); L27 callback (inline callback)(i) |
| `app/search/page.tsx` | TSX / React · 238 bytes · 12 lines | Next.js App Router page and route implementation<br>exports: default function SearchPage<br>imports: react, @/components/search/search-content<br>functions/methods (1): L6 function SearchPage() |
| `app/sell/layout.tsx` | TSX / React · 313 bytes · 5 lines | Next.js App Router layout and route metadata<br>exports: default function SellLayout<br>imports: @/components/seo/breadcrumb-json-ld<br>functions/methods (1): L3 function SellLayout({ children }: { children: React.ReactNode }) |
| `app/sell/page.tsx` | TSX / React · 16,567 bytes · 414 lines | Next.js App Router page and route implementation<br>exports: default function SellPage<br>imports: react, @/components/ui/button, lucide-react<br>functions/methods (29): L60 function SellPage(); L67 callback set(key: keyof FormData, value: string); L68 callback (inline callback)(prev); L70 callback toggleFacility(f: string); L71 callback (inline callback)(prev); L74 callback (inline callback)(x); L78 callback canAdvance(); L86 callback async handleSubmit(); L130 callback (inline callback)(); L154 callback (inline callback)(label, idx); L189 callback (inline callback)(t); L193 callback (inline callback)(); L212 callback (inline callback)(e); L218 callback (inline callback)(e); L219 callback (inline callback)(u); L234 callback (inline callback)(e); L236 callback (inline callback)(s); L247 callback (inline callback)(e); L257 callback (inline callback)(e); L271 callback (inline callback)(f); L283 callback (inline callback)(); L297 callback (inline callback)(e); L314 callback (inline callback)(e); L324 callback (inline callback)(e); L334 callback (inline callback)(e); L343 callback (inline callback)(t); L364 callback (inline callback)(); L374 callback (inline callback)(); L399 callback (inline callback)({ icon: Icon, title, desc }) |
| `app/services/advisory/page.tsx` | TSX / React · 12,123 bytes · 283 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function PropertyAdvisoryPage<br>imports: next, @/components/layout/header, @/components/layout/footer, next/link, @/components/ui/button, @/components/services/service-enquiry-form, lucide-react<br>functions/methods (4): L96 function PropertyAdvisoryPage(); L163 callback (inline callback)(feature, idx); L187 callback (inline callback)(item, idx); L214 callback (inline callback)(benefit, idx) |
| `app/services/after-sales/page.tsx` | TSX / React · 16,469 bytes · 391 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function AfterSalesSupportPage<br>imports: next, @/components/layout/header, @/components/layout/footer, next/link, @/components/ui/button, @/components/services/service-enquiry-form, lucide-react<br>functions/methods (7): L145 function AfterSalesSupportPage(); L211 callback (inline callback)(service, idx); L219 callback (inline callback)(feature, fidx); L242 callback (inline callback)(pkg, idx); L263 callback (inline callback)(feature, fidx); L297 callback (inline callback)(item, idx); L322 callback (inline callback)(benefit, idx) |
| `app/services/builder-partnerships/page.tsx` | TSX / React · 14,456 bytes · 322 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function BuilderPartnershipsPage<br>imports: next, @/components/layout/header, @/components/layout/footer, next/link, @/components/ui/button, @/components/services/service-enquiry-form, lucide-react<br>functions/methods (5): L108 function BuilderPartnershipsPage(); L174 callback (inline callback)(benefit, idx); L198 callback (inline callback)(partner, idx); L226 callback (inline callback)(offer, idx); L287 callback (inline callback)(item, idx) |
| `app/services/commercial/page.tsx` | TSX / React · 14,736 bytes · 324 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function CommercialRealEstatePage<br>imports: next, @/components/layout/header, @/components/layout/footer, next/link, @/components/ui/button, @/components/services/service-enquiry-form, lucide-react<br>functions/methods (6): L100 function CommercialRealEstatePage(); L166 callback (inline callback)(type, idx); L176 callback (inline callback)(feature, fidx); L201 callback (inline callback)(location, idx); L230 callback (inline callback)(item, idx); L255 callback (inline callback)(benefit, idx) |
| `app/services/home-loans/page.tsx` | TSX / React · 11,377 bytes · 276 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function HomeLoanAssistancePage<br>imports: next, @/components/layout/header, @/components/layout/footer, next/link, @/components/ui/button, @/components/services/service-enquiry-form, lucide-react<br>functions/methods (5): L106 function HomeLoanAssistancePage(); L172 callback (inline callback)(bank, idx); L193 callback (inline callback)(feature, idx); L213 callback (inline callback)(item, idx); L241 callback (inline callback)(item, idx) |
| `app/services/investment/page.tsx` | TSX / React · 12,759 bytes · 291 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function InvestmentConsultingPage<br>imports: next, @/components/layout/header, @/components/layout/footer, next/link, @/components/ui/button, @/components/services/service-enquiry-form, lucide-react<br>functions/methods (4): L100 function InvestmentConsultingPage(); L166 callback (inline callback)(type, idx); L197 callback (inline callback)(feature, idx); L222 callback (inline callback)(benefit, idx) |
| `app/services/legal/page.tsx` | TSX / React · 11,923 bytes · 284 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function LegalAssistancePage<br>imports: next, @/components/layout/header, @/components/layout/footer, next/link, @/components/ui/button, @/components/services/service-enquiry-form, lucide-react<br>functions/methods (5): L99 function LegalAssistancePage(); L165 callback (inline callback)(service, idx); L190 callback (inline callback)(doc, idx); L203 callback (inline callback)(item, idx); L239 callback (inline callback)(item, idx) |
| `app/services/loading.tsx` | TSX / React · 1,029 bytes · 23 lines | Next.js App Router loading/error boundary UI<br>exports: default function Loading<br>functions/methods (2): L1 function Loading(); L9 callback (inline callback)(i) |
| `app/services/nri/page.tsx` | TSX / React · 12,365 bytes · 288 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function NRIServicesPage<br>imports: next, @/components/layout/header, @/components/layout/footer, next/link, @/components/ui/button, @/components/services/service-enquiry-form, lucide-react<br>functions/methods (6): L100 function NRIServicesPage(); L162 callback (inline callback)(country, idx); L185 callback (inline callback)(feature, idx); L209 callback (inline callback)(item, idx); L234 callback (inline callback)(benefit, idx); L254 callback (inline callback)(item, idx) |
| `app/services/page.tsx` | TSX / React · 16,728 bytes · 413 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function ServicesPage<br>imports: next, @/components/layout/header, @/components/layout/footer, next/link, @/components/ui/button, lucide-react<br>functions/methods (6): L185 function ServicesPage(); L225 callback (inline callback)(stat, idx); L246 callback (inline callback)(service); L270 callback (inline callback)(feature, idx); L301 callback (inline callback)(item, idx); L340 callback (inline callback)(item, idx) |
| `app/site-map/page.tsx` | TSX / React · 4,797 bytes · 135 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function SiteMapPage<br>imports: next, next/link, lucide-react, @/components/layout/header, @/components/layout/footer<br>functions/methods (3): L75 function SiteMapPage(); L102 callback (inline callback)(section); L116 callback (inline callback)(link) |
| `app/sitemap.ts` | TypeScript · 8,087 bytes · 295 lines | Next.js App Router route, metadata, styling, or platform file<br>exports: default function sitemap<br>imports: next, mongodb<br>functions/methods (20): L8 function sanitizeSlug(slug: string): string; L19 function async getDbConnection(); L42 function getPropertyTypeSlug(propertyType: string): string; L47 callback (inline callback)(t); L54 function async getProperties(); L74 function async getBlogs(); L94 function async getDevelopers(); L114 function async getLocations(); L134 function async getNews(); L154 function async sitemap(): Promise<MetadataRoute.Sitemap>; L236 callback (inline callback)(prop: any); L237 callback (inline callback)(prop: any); L249 callback (inline callback)(blog: any); L250 callback (inline callback)(blog: any); L259 callback (inline callback)(dev: any); L260 callback (inline callback)(dev: any); L269 callback (inline callback)(loc: any); L270 callback (inline callback)(loc: any); L279 callback (inline callback)(item: any); L280 callback (inline callback)(item: any) |
| `app/state-land-portals/page.tsx` | TSX / React · 1,313 bytes · 26 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function StateLandPortalsPage<br>imports: next, @/components/sections/state-portal-finder<br>functions/methods (1): L11 function StateLandPortalsPage() |
| `app/subscription/page.tsx` | TSX / React · 14,828 bytes · 296 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function SubscriptionPage<br>imports: next, lucide-react, @/components/layout/header, @/components/layout/footer<br>functions/methods (5): L11 function SubscriptionPage(); L114 callback (inline callback)(plan); L149 callback (inline callback)(feature); L234 callback (inline callback)(testimonial); L237 callback (inline callback)(_, i) |
| `app/sunteck-beach-residences/page.tsx` | TSX / React · 41,115 bytes · 556 lines | Next.js App Router page and route implementation<br>exports: default function SunteckBeachResidencesPage<br>imports: react, next/script, @/components/layout/header, @/components/layout/footer, lucide-react<br>functions/methods (11): L13 function SunteckBeachResidencesPage(); L20 callback scrollSlider(ref: React.RefObject<HTMLDivElement>, direction: "left" \| "right"); L28 callback async handleEOISubmit(e: FormEvent<HTMLFormElement>); L77 callback closeModal(); L77 callback (inline callback)(prev); L329 callback (inline callback)(); L332 callback (inline callback)(); L346 callback (inline callback)(slide, i); L368 callback (inline callback)(); L371 callback (inline callback)(); L389 callback (inline callback)(slide, i) |
| `app/terms-and-conditions/page.tsx` | TSX / React · 12,748 bytes · 227 lines | Next.js App Router page and route implementation<br>exports: const metadata, default function TermsPage<br>imports: next<br>functions/methods (1): L11 function TermsPage() |
| `app/test-page.tsx` | TSX / React · 331 bytes · 10 lines | Next.js App Router route, metadata, styling, or platform file<br>exports: default function TestPage<br>functions/methods (1): L1 function TestPage() |
| `app/tools/emi-calculator/page.tsx` | TSX / React · 14,389 bytes · 300 lines | Next.js App Router page and route implementation<br>exports: default function EMICalculatorPage<br>imports: react, next, @/components/layout/header, @/components/layout/footer, @/components/ui/button, @/components/ui/card, lucide-react<br>functions/methods (8): L11 function EMICalculatorPage(); L17 callback (inline callback)(); L44 callback formatCurrency(amount: number); L101 callback (inline callback)(e); L127 callback (inline callback)(e); L149 callback (inline callback)(); L159 callback (inline callback)(); L177 callback (inline callback)(e) |
| `app/tools/qr-generator/page.tsx` | TSX / React · 11,261 bytes · 267 lines | Next.js App Router page and route implementation<br>exports: default function QRGeneratorPage<br>imports: react, @/components/layout/header, @/components/layout/footer, @/components/ui/button, @/components/ui/card, lucide-react<br>functions/methods (14): L10 function QRGeneratorPage(); L24 callback getQRValue(); L35 callback generateQR(); L44 callback async handleDownload(); L63 callback async handleCopy(); L73 callback (inline callback)(); L78 callback (inline callback)(); L113 callback (inline callback)(type); L116 callback (inline callback)(); L136 callback (inline callback)(t); L141 callback (inline callback)(e); L145 callback (inline callback)(t); L153 callback (inline callback)(e); L157 callback (inline callback)(t) |
| `components.json` | JSON data/config · 427 bytes | Project/tool configuration or structured data |
| `components/account/delete-account-section.tsx` | TSX / React · 4,767 bytes · 131 lines | Reusable UI component or feature-specific presentation module<br>exports: default function DeleteAccountSection<br>imports: react, next/navigation, lucide-react, sonner, @/components/ui/button, @/components/ui/input, @/components/ui/label, @/components/ui/alert-dialog<br>functions/methods (6): L31 function DeleteAccountSection(); L37 callback async handleDelete(); L58 callback (inline callback)(); L84 callback (inline callback)(v); L107 callback (inline callback)(e); L116 callback (inline callback)(e) |
| `components/account/profile-image-upload.tsx` | TSX / React · 4,244 bytes · 123 lines | Reusable UI component or feature-specific presentation module<br>exports: default function ProfileImageUpload<br>imports: react, react, lucide-react, @/components/ui/user-avatar<br>functions/methods (6): L23 function ProfileImageUpload({ name, value, onChange, disabled }: ProfileImageUploadProps); L28 callback async handleFile(file: File); L61 callback onInputChange(e: React.ChangeEvent<HTMLInputElement>); L78 callback (inline callback)(); L91 callback (inline callback)(); L100 callback (inline callback)() |
| `components/admin/admin-nav.tsx` | TSX / React · 3,706 bytes · 115 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AdminNav<br>imports: next/link, next/navigation, @/components/ui/button, lucide-react<br>functions/methods (5): L26 function AdminNav(); L30 callback async handleLogout(); L35 callback isActive(href: string); L78 callback (inline callback)(section); L82 callback (inline callback)(item) |
| `components/admin/agent-detail-page.tsx` | TSX / React · 21,701 bytes · 335 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AgentDetailPage<br>imports: react, react, next/link, swr, lucide-react, sonner, @/components/ui/badge, @/components/ui/button, @/components/ui/card, @/components/ui/field, @/components/ui/input, @/components/ui/select, … (13 total)<br>functions/methods (20): L29 callback async fetcher(url: string): Promise<AgentOverview>; L36 function dateLabel(value?: string \| null); L42 function statusVariant(status?: string); L48 function AgentDetailPage({ agentId }: { agentId: string }); L61 callback async submit(url: string, body: Record<string, unknown>, success: string); L78 callback async saveAccount(); L103 callback (inline callback)(item); L131 callback (inline callback)([label, value]); L156 callback (inline callback)(event); L186 callback async (inline callback)(event); L197 callback (inline callback)(plan); L202 callback (inline callback)(event); L206 callback (inline callback)(event); L210 callback (inline callback)(event); L222 callback async (inline callback)(event); L267 callback async (inline callback)(event); L281 callback async (inline callback)(event); L297 callback async (inline callback)(event); L321 function HistoryCard({ title, icon, rows, empty }: { title: string; icon: ReactNode; rows: Array<Record<string, any>>; empty: string }); L326 callback (inline callback)(row, index) |
| `components/admin/agent-management-page.tsx` | TSX / React · 8,978 bytes · 161 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AgentManagementPage<br>imports: next/link, swr, react, lucide-react, @/components/ui/badge, @/components/ui/button, @/components/ui/card, @/components/ui/field, @/components/ui/input, @/components/ui/select, @/components/admin/agent-subscription-analytics<br>functions/methods (14): L27 callback async fetcher(url: string); L34 function statusVariant(status: string); L40 function AgentManagementPage(); L46 callback (inline callback)(); L62 callback (inline callback)(); L79 callback (inline callback)(event); L87 callback (inline callback)(value); L99 callback (inline callback)(value); L117 callback (inline callback)(item); L125 callback (inline callback)(row); L152 callback (inline callback)(); L152 callback (inline callback)(value); L153 callback (inline callback)(); L153 callback (inline callback)(value) |
| `components/admin/agent-subscription-analytics.tsx` | TSX / React · 5,497 bytes · 103 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AgentSubscriptionAnalytics<br>imports: react, swr, lucide-react, @/components/ui/badge, @/components/ui/card, @/components/ui/field, @/components/ui/input, @/components/ui/select<br>functions/methods (8): L20 callback async fetcher(url: string): Promise<Analytics>; L29 function AgentSubscriptionAnalytics(); L33 callback (inline callback)(); L67 callback (inline callback)([code, label]); L73 callback (inline callback)(event); L77 callback (inline callback)(event); L84 callback (inline callback)({ label, value, icon: Icon }); L96 callback (inline callback)([code, count]) |
| `components/admin/blog-post-form.tsx` | TSX / React · 41,975 bytes · 1053 lines | Reusable UI component or feature-specific presentation module<br>exports: default function BlogPostForm<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input, @/components/ui/textarea, @/components/ui/card, @/components/ui/tabs, @/components/blog/rich-text-editor, @/components/blog/table-of-contents, lucide-react<br>functions/methods (89): L42 function BlogPostForm({ initialData }: BlogPostFormProps); L48 callback getInitialCategories(); L55 callback getInitialTags(); L58 callback (inline callback)(t: string); L62 callback getInitialKeywords(); L64 callback (inline callback)(k: string); L109 callback (inline callback)(); L110 callback async fetchCategories(); L124 callback async fetchTags(); L138 callback async fetchKeywords(); L157 callback handleChange(e: React.ChangeEvent<HTMLInputElement \| HTMLTextAreaElement \| HTMLSelectElement>); L159 callback (inline callback)(prev); L167 callback async handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, fieldName: string); L171 callback (inline callback)(prev); L185 callback (inline callback)(); L190 callback (inline callback)(prev); L194 callback (inline callback)(prev); L200 callback toggleCategory(categoryName: string); L201 callback (inline callback)(prev); L204 callback (inline callback)(c); L210 callback removeCategory(categoryName: string); L211 callback (inline callback)(prev); L213 callback (inline callback)(c); L217 callback async addNewCategory(); L238 callback (inline callback)(prev); L239 callback (inline callback)(prev); L252 callback toggleTag(tagName: string); L253 callback (inline callback)(prev); L256 callback (inline callback)(t); L262 callback removeTag(tagName: string); L263 callback (inline callback)(prev); L265 callback (inline callback)(t); L269 callback addNewTag(); L275 callback (inline callback)(prev); L280 callback (inline callback)(prev); L289 callback toggleKeyword(keyword: string); L290 callback (inline callback)(prev); L293 callback (inline callback)(k); L299 callback removeKeyword(keyword: string); L300 callback (inline callback)(prev); L302 callback (inline callback)(k); L306 callback addNewKeyword(); L312 callback (inline callback)(prev); L317 callback (inline callback)(prev); L325 callback async handleSubmit(e: React.FormEvent, publishStatus: boolean = true); L358 callback (inline callback)(prev); L361 callback (inline callback)(); L426 callback (inline callback)(); L431 callback (inline callback)(cat); L439 callback (inline callback)(e); L462 callback (inline callback)(e); L463 callback (inline callback)(e); L464 callback (inline callback)(e); L475 callback (inline callback)(e); L498 callback (inline callback)(cat); L502 callback (inline callback)(e); L524 callback (inline callback)(e); L548 callback (inline callback)(); L553 callback (inline callback)(tag); L561 callback (inline callback)(e); L584 callback (inline callback)(e); L585 callback (inline callback)(e); L586 callback (inline callback)(e); L597 callback (inline callback)(e); L620 callback (inline callback)(tag); L624 callback (inline callback)(e); L646 callback (inline callback)(e); L688 callback (inline callback)(e); L699 callback (inline callback)(); L699 callback (inline callback)(prev); L724 callback (inline callback)(e); L735 callback (inline callback)(); L735 callback (inline callback)(prev); L768 callback (inline callback)(content); L768 callback (inline callback)(prev); L844 callback (inline callback)(); L849 callback (inline callback)(keyword); L857 callback (inline callback)(e); L880 callback (inline callback)(e); L881 callback (inline callback)(e); L882 callback (inline callback)(e); L893 callback (inline callback)(e); L916 callback (inline callback)(keyword); L920 callback (inline callback)(e); L942 callback (inline callback)(e); L999 callback (inline callback)(e); L1010 callback (inline callback)(); L1010 callback (inline callback)(prev); L1046 callback (inline callback)(e) |
| `components/admin/blog-posts-list.tsx` | TSX / React · 11,043 bytes · 285 lines | Reusable UI component or feature-specific presentation module<br>exports: default function BlogPostsList<br>imports: react, next/link, next/image, @/components/ui/button, @/components/ui/table, lucide-react, @/components/ui/input<br>functions/methods (14): L25 function BlogPostsList(); L33 callback async (inline callback)(); L42 callback (inline callback)(); L57 callback (inline callback)(); L61 callback (inline callback)(); L66 callback (inline callback)(post); L77 callback async handleDelete(id: string); L93 callback (inline callback)(prev); L93 callback (inline callback)(post); L94 callback (inline callback)(prev); L94 callback (inline callback)(post); L132 callback (inline callback)(e); L189 callback (inline callback)(post); L262 callback (inline callback)() |
| `components/admin/buyer-messages-client.tsx` | TSX / React · 17,960 bytes · 536 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AdminBuyerMessagesClient<br>imports: react, lucide-react, @/components/ui/button, @/components/ui/input, @/components/ui/textarea, @/components/ui/select, @/lib/utils<br>functions/methods (34): L86 function formatDate(d: string); L94 function formatTime(d: string); L100 function StatRow({ stats }: { stats: Stats }); L108 callback (inline callback)(s); L120 function AdminThreadPanel({ thread, onUpdate, }: { thread: Thread onUpdate: (updated: Thread) => void }); L133 callback (inline callback)(); L137 callback async patch(payload: { reply?: string; status?: string }); L148 callback async handleSend(); L163 callback async handleClose(); L176 callback async handleReopen(); L189 callback handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>); L260 callback (inline callback)(msg); L293 callback (inline callback)(e); L321 function AdminBuyerMessagesClient(); L332 callback async fetchThreads(pageNum = 1, status = "all", q = ""); L348 callback (inline callback)(t); L358 callback (inline callback)(); L364 callback (inline callback)(); L365 callback (inline callback)(); L366 callback (inline callback)(); L370 callback handleUpdate(updated: Thread); L371 callback (inline callback)(prev); L371 callback (inline callback)(t); L387 callback (inline callback)(e); L391 callback (inline callback)(v); L403 callback (inline callback)(); L416 callback (inline callback)(); L440 callback (inline callback)(t); L446 callback (inline callback)(); L488 callback (inline callback)(); L488 callback (inline callback)(p); L499 callback (inline callback)(); L499 callback (inline callback)(p); L512 callback (inline callback)() |
| `components/admin/contacts-list.tsx` | TSX / React · 2,376 bytes · 74 lines | Reusable UI component or feature-specific presentation module<br>exports: default function ContactsList<br>imports: react, @/components/ui/table<br>functions/methods (4): L16 function ContactsList(); L20 callback (inline callback)(); L21 callback async fetchContacts(); L59 callback (inline callback)(contact) |
| `components/admin/import-export-dialog.tsx` | TSX / React · 17,034 bytes · 437 lines | Reusable UI component or feature-specific presentation module<br>exports: function ImportExportDialog<br>imports: react, react, @/components/ui/button, @/components/ui/card, lucide-react<br>functions/methods (17): L39 function ImportExportDialog({ entityType, onImportSuccess, }: { entityType: string; onImportSuccess?: () => void }); L51 callback async handleFileSelect(e: React.ChangeEvent<HTMLInputElement>); L79 callback async handleImport(); L111 callback handleCloseAll(); L120 callback async handleExport(format: "csv" \| "xlsx"); L136 callback async handleDownloadSample(format: "csv" \| "xlsx"); L152 callback getConfigTypeLabel(type: string): string; L166 callback (inline callback)(); L170 callback (inline callback)(); L174 callback (inline callback)(); L210 callback (inline callback)(); L219 callback (inline callback)(); L288 callback (inline callback)([field, accuracy]); L318 callback (inline callback)(error, idx); L378 callback (inline callback)([type, names]); L384 callback (inline callback)(name); L411 callback (inline callback)(error, idx) |
| `components/admin/leads-list.tsx` | TSX / React · 29,462 bytes · 757 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AdminLeadsList<br>imports: react, @/components/ui/table, @/components/ui/button, @/components/ui/input, @/components/ui/select, @/components/ui/dialog, @/components/ui/textarea, @/components/ui/badge, lucide-react, @/components/ui/dropdown-menu, @/lib/models<br>functions/methods (32): L93 function AdminLeadsList(); L118 callback async (inline callback)(); L145 callback async (inline callback)(); L150 callback (inline callback)(u: Associate & { user_type: string }); L157 callback (inline callback)(); L162 callback async handleStatusChange(leadId: string, newStatus: LeadStatus); L178 callback async handlePriorityChange(leadId: string, newPriority: LeadPriority); L194 callback async handleAssignLead(); L218 callback async handleAddNote(); L245 callback async handleDeleteLead(leadId: string); L261 callback formatDate(date: string \| Date); L269 callback formatTime(date: string \| Date); L320 callback (inline callback)(e); L328 callback (inline callback)(v); L342 callback (inline callback)(v); L358 callback (inline callback)(); L366 callback (inline callback)(); L393 callback (inline callback)(lead); L432 callback (inline callback)(v); L449 callback (inline callback)(v); L479 callback (inline callback)(); L491 callback (inline callback)(); L506 callback (inline callback)(); L536 callback (inline callback)(); L562 callback (inline callback)(); L562 callback (inline callback)(p); L573 callback (inline callback)(); L573 callback (inline callback)(p); L608 callback (inline callback)(associate); L617 callback (inline callback)(); L639 callback (inline callback)(note, i); L657 callback (inline callback)(e) |
| `components/admin/property-filters.tsx` | TSX / React · 15,393 bytes · 393 lines | Reusable UI component or feature-specific presentation module<br>exports: interface PropertyFiltersProps, function PropertyFilters<br>imports: react, react, @/components/ui/button, @/components/ui/input, @/components/ui/select, lucide-react, @/lib/utils<br>functions/methods (28): L66 function PropertyFilters({ onChange, initial = {} }: PropertyFiltersProps); L73 callback (inline callback)([key, value]); L76 callback (inline callback)(name: string, value: string); L85 callback handleInputChange(e: React.ChangeEvent<HTMLInputElement>); L89 callback clearFilters(); L94 callback clearSingleFilter(key: string); L119 callback (inline callback)(); L120 callback (inline callback)(); L124 callback (inline callback)(); L136 callback (inline callback)(value); L144 callback (inline callback)(type); L154 callback (inline callback)(value); L162 callback (inline callback)(status); L177 callback (inline callback)(); L213 callback (inline callback)(value); L220 callback (inline callback)(type); L237 callback (inline callback)(value); L244 callback (inline callback)(option); L294 callback (inline callback)(value); L297 callback (inline callback)(); L305 callback (inline callback)(range); L361 callback (inline callback)([, value]); L361 callback (inline callback)([key, value]); L363 callback (inline callback)(t); L364 callback (inline callback)(s); L365 callback (inline callback)(l); L366 callback (inline callback)(o); L373 callback (inline callback)() |
| `components/admin/property-review-card.tsx` | TSX / React · 11,437 bytes · 289 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PropertyReviewCard<br>imports: react, next/link, lucide-react, @/components/ui/button, @/components/ui/textarea, @/components/ui/dialog, @/lib/models, @/lib/utils<br>functions/methods (10): L34 function PropertyReviewCard({ property, onReviewed, }: { property: any onReviewed: (id: string, status: "approved" \| "rejected") => void }); L47 callback (inline callback)(d); L50 callback async submitReview(action: "approve" \| "reject", notes?: string); L180 callback (inline callback)(d); L221 callback (inline callback)(); L230 callback (inline callback)(); L245 callback (inline callback)(); L267 callback (inline callback)(e); L273 callback (inline callback)(); L278 callback (inline callback)() |
| `components/admin/quotes-list.tsx` | TSX / React · 2,937 bytes · 89 lines | Reusable UI component or feature-specific presentation module<br>exports: default function QuotesList<br>imports: react, @/components/ui/table<br>functions/methods (4): L17 function QuotesList(); L21 callback (inline callback)(); L22 callback async fetchQuotes(); L61 callback (inline callback)(quote) |
| `components/admin/section-property-editor.tsx` | TSX / React · 15,483 bytes · 419 lines | Reusable UI component or feature-specific presentation module<br>exports: default function SectionPropertyEditor<br>imports: @/components/ui/button, @/components/ui/input, react, lucide-react, @/lib/utils, @/hooks/use-toast<br>functions/methods (16): L34 function SectionPropertyEditor({ sectionId }: Props); L43 callback (inline callback)(); L44 callback async loadData(); L104 callback async removeProperty(propertyId: string); L117 callback (inline callback)(p); L143 callback async addProperty(propertyId: string); L237 callback (inline callback)(p); L239 callback (inline callback)(p); L279 callback (inline callback)(prop, index); L295 callback (inline callback)(e); L309 callback (inline callback)(); L339 callback (inline callback)(e); L353 callback (inline callback)(); L361 callback (inline callback)(prop); L379 callback (inline callback)(e); L393 callback (inline callback)() |
| `components/admin/subscription-plan-management-page.tsx` | TSX / React · 18,966 bytes · 339 lines | Reusable UI component or feature-specific presentation module<br>exports: default function SubscriptionPlanManagementPage<br>imports: react, swr, lucide-react, sonner, @/components/ui/badge, @/components/ui/button, @/components/ui/checkbox, @/components/ui/card, @/components/ui/dialog, @/components/ui/input, @/components/ui/field, @/components/ui/select, … (13 total)<br>functions/methods (36): L39 callback async fetcher(url: string); L46 callback blankForm(); L64 function formatPrice(plan: Plan); L70 function SubscriptionPlanManagementPage(); L77 callback (inline callback)(code); L77 callback (inline callback)(plan); L79 callback startCreate(); L92 callback startEdit(plan: Plan); L112 callback updateField(key: K, value: PlanForm[K]); L113 callback (inline callback)(current); L116 callback async initializeDefaults(); L131 callback async savePlan(event: React.FormEvent<HTMLFormElement>); L141 callback (inline callback)(benefit); L160 callback async togglePlan(plan: Plan); L183 callback (inline callback)(); L190 callback (inline callback)(item); L193 callback (inline callback)(plan); L216 callback (inline callback)(benefit); L220 callback (inline callback)(); L221 callback (inline callback)(); L250 callback (inline callback)(value); L250 callback (inline callback)(current); L261 callback (inline callback)(code); L267 callback (inline callback)(event); L272 callback (inline callback)(event); L277 callback (inline callback)(value); L286 callback (inline callback)(event); L290 callback (inline callback)(event); L294 callback (inline callback)(event); L299 callback (inline callback)(event); L304 callback (inline callback)(value); L311 callback (inline callback)(event); L317 callback (inline callback)(checked); L321 callback (inline callback)(checked); L325 callback (inline callback)(checked); L330 callback (inline callback)() |
| `components/admin/wordpress-blog-editor.tsx` | TSX / React · 96,832 bytes · 2470 lines | Reusable UI component or feature-specific presentation module<br>exports: default function WordPressBlogEditor<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input, @/components/ui/textarea, @/lib/utils, @/components/blog/block-editor, @tiptap/core, lucide-react<br>functions/methods (154): L103 function CollapsiblePanel({ title, icon: Icon, children, defaultOpen = false }: { title: string icon: React.ElementType children: React.ReactNode defaultOpen?: boolean }); L120 callback (inline callback)(); L143 function SEOScore({ score, label }: { score: number; label: string }); L144 callback getScoreColor(s: number); L164 function GooglePreview({ title, slug, description, siteUrl = "land2land.com" }: { title: string slug: string description: string siteUrl?: string }); L194 function extractExcerptFromContent(htmlContent: string, maxLength = 200): string; L209 callback (inline callback)(p); L217 function generateBlogSchema({ title, content, author, slug, cover_image, categories, tags, faqs, datePublished, dateModified, siteUrl = "https://land2land.com" }: { title: string content: string author: string slug: string cover_image: string categories: string[] tags: string[] faqs: FAQItem[] datePublished?: string dateModified?: string siteUrl?: string }); L251 callback (inline callback)(w); L295 callback (inline callback)(faq); L300 callback (inline callback)(faq); L351 function SchemaPreviewModal({ isOpen, onClose, schemas }: { isOpen: boolean onClose: () => void schemas: object[] }); L366 callback async handleCopy(); L370 callback (inline callback)(); L410 callback (inline callback)(schema, index); L439 function FAQSection({ faqs, onAddFaq, onUpdateFaq, onRemoveFaq }: { faqs: FAQItem[] onAddFaq: () => void onUpdateFaq: (id: string, field: "question" \| "answer", value: string) => void onRemoveFaq: (id: string) => void }); L480 callback (inline callback)(faq, index); L497 callback (inline callback)(e); L508 callback (inline callback)(e); L518 callback (inline callback)(); L542 function BlockSettingsPanel({ blockType, blockPos, onClose, editor }: { blockType: string \| null blockPos: number \| null onClose: () => void editor: Editor \| null }); L559 callback getBlockIcon(); L577 callback handleImagePercentSize(percent: string); L602 callback handleImagePixelSize(px: number); L627 callback handleCustomSize(); L656 callback handleAltTextChange(value: string); L704 callback (inline callback)(); L711 callback (inline callback)(); L718 callback (inline callback)(); L738 callback (inline callback)(size); L742 callback (inline callback)(); L755 callback (inline callback)(px); L759 callback (inline callback)(); L776 callback (inline callback)(e); L783 callback (inline callback)(e); L805 callback (inline callback)(e); L820 callback (inline callback)(color); L824 callback (inline callback)(); L837 callback (inline callback)(); L848 callback (inline callback)(color); L852 callback (inline callback)(); L893 function WordPressBlogEditor({ initialData }: WordPressBlogEditorProps); L907 callback getInitialCategories(); L927 callback (inline callback)(t); L928 callback (inline callback)(k); L955 callback (inline callback)(title: string); L963 callback (inline callback)(); L991 callback (inline callback)(); L996 callback (inline callback)(t); L1002 callback (inline callback)(k); L1009 callback (inline callback)(); L1010 callback async fetchCategories(); L1027 callback (inline callback)(); L1032 callback async (inline callback)(); L1063 callback (inline callback)(); L1068 callback handleChange(e: React.ChangeEvent<HTMLInputElement \| HTMLTextAreaElement>); L1070 callback (inline callback)(prev); L1084 callback async handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, fieldName: string); L1088 callback (inline callback)(prev); L1102 callback (inline callback)(); L1107 callback (inline callback)(prev); L1111 callback (inline callback)(prev); L1116 callback toggleCategory(categoryName: string); L1117 callback (inline callback)(prev); L1120 callback (inline callback)(c); L1126 callback async addNewCategory(); L1137 callback (inline callback)(prev); L1138 callback (inline callback)(prev); L1152 callback toggleTag(tagName: string); L1153 callback (inline callback)(prev); L1156 callback (inline callback)(t); L1163 callback addNewTag(); L1168 callback (inline callback)(prev); L1173 callback (inline callback)(prev); L1180 callback toggleKeyword(keywordName: string); L1181 callback (inline callback)(prev); L1184 callback (inline callback)(k); L1191 callback addNewKeyword(); L1196 callback (inline callback)(prev); L1201 callback (inline callback)(prev); L1207 callback async handleSubmit(publishStatus: boolean = true); L1260 callback (inline callback)(prev); L1262 callback (inline callback)(); L1273 callback handlePreview(); L1280 callback handleAddFaq(); L1286 callback (inline callback)(prev); L1292 callback handleUpdateFaq(id: string, field: "question" \| "answer", value: string); L1293 callback (inline callback)(prev); L1295 callback (inline callback)(faq); L1301 callback handleRemoveFaq(id: string); L1302 callback (inline callback)(prev); L1304 callback (inline callback)(faq); L1331 callback (inline callback)(); L1361 callback (inline callback)(); L1384 callback (inline callback)(); L1402 callback (inline callback)(); L1461 callback (inline callback)(content); L1461 callback (inline callback)(prev); L1463 callback (inline callback)(blockType, blockPos); L1470 callback (inline callback)(editor); L1493 callback (inline callback)(); L1508 callback (inline callback)(); L1526 callback (inline callback)(); L1549 callback (inline callback)(); L1594 callback (inline callback)(e); L1596 callback (inline callback)(e); L1619 callback (inline callback)(cat); L1627 callback (inline callback)(); L1649 callback (inline callback)(cat); L1653 callback (inline callback)(); L1675 callback (inline callback)(e); L1677 callback (inline callback)(e); L1700 callback (inline callback)(tag); L1708 callback (inline callback)(); L1722 callback (inline callback)(tag); L1726 callback (inline callback)(); L1757 callback (inline callback)(); L1757 callback (inline callback)(prev); L1767 callback (inline callback)(e); L1800 callback (inline callback)(); L1800 callback (inline callback)(prev); L1810 callback (inline callback)(e); L1849 callback (inline callback)(e); L1857 callback (inline callback)(prev); L1859 callback (inline callback)(e); L1870 callback (inline callback)(prev); L1872 callback (inline callback)(); L1878 callback (inline callback)(e); L1887 callback (inline callback)(prev); L1897 callback (inline callback)(); L1899 callback (inline callback)(prev); L1920 callback (inline callback)(); L1983 callback (inline callback)(schema, idx); L1996 callback (inline callback)(); L2077 callback (inline callback)(e); L2079 callback (inline callback)(e); L2102 callback (inline callback)(keyword); L2110 callback (inline callback)(); L2124 callback (inline callback)(keyword); L2128 callback (inline callback)(); L2176 callback (inline callback)(e); L2187 callback (inline callback)(); L2187 callback (inline callback)(prev); L2226 callback (inline callback)(item, idx); L2252 callback (inline callback)(); L2271 callback (inline callback)(h); L2272 callback (inline callback)(h); L2273 callback (inline callback)(h); L2282 callback (inline callback)(heading, idx); L2317 callback (inline callback)(); L2352 callback (inline callback)(img, idx); L2394 callback (inline callback)(); L2405 callback (inline callback)(w); L2465 callback (inline callback)() |
| `components/agent/agent-dashboard-nav.tsx` | TSX / React · 2,137 bytes · 59 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AssociateDashboardNav<br>imports: next/link, next/navigation, @/components/ui/button, lucide-react<br>functions/methods (4): L8 function AssociateDashboardNav(); L12 callback async handleLogout(); L17 callback isActive(href: string); L31 callback (inline callback)(item) |
| `components/agent/leads-list.tsx` | TSX / React · 25,154 bytes · 638 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AssociateLeadsList<br>imports: react, @/components/ui/table, @/components/ui/button, @/components/ui/input, @/components/ui/select, @/components/ui/dialog, @/components/ui/textarea, @/components/ui/badge, @/components/ui/card, lucide-react, @/lib/models<br>functions/methods (21): L82 function AssociateLeadsList(); L101 callback async (inline callback)(); L127 callback (inline callback)(); L131 callback async handleStatusChange(leadId: string, newStatus: LeadStatus); L150 callback async handleAddNote(); L177 callback formatDate(date: string \| Date); L185 callback formatTime(date: string \| Date); L268 callback (inline callback)(e); L276 callback (inline callback)(v); L290 callback (inline callback)(v); L302 callback (inline callback)(); L332 callback (inline callback)(lead); L369 callback (inline callback)(v); L422 callback (inline callback)(); L434 callback (inline callback)(); L462 callback (inline callback)(); L462 callback (inline callback)(p); L473 callback (inline callback)(); L473 callback (inline callback)(p); L494 callback (inline callback)(note, i); L512 callback (inline callback)(e) |
| `components/agreements/agreement-layout.tsx` | TSX / React · 3,323 bytes · 108 lines | Reusable UI component or feature-specific presentation module<br>exports: function AgreementLayout<br>imports: react, lucide-react, @/components/ui/button<br>functions/methods (3): L15 function AgreementLayout({ title, effectiveDate, lastUpdated, children, documentId, }: AgreementLayoutProps); L22 callback handlePrint(); L26 callback handleDownload() |
| `components/associate/agent-subscription-page.tsx` | TSX / React · 11,994 bytes · 172 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AgentSubscriptionPage<br>imports: next/link, react, swr, lucide-react, @/components/ui/badge, @/components/ui/button, @/components/ui/card, @/components/ui/progress<br>functions/methods (10): L23 callback async fetcher(url: string): Promise<AgentSubscriptionData>; L30 function dateLabel(value?: string \| null); L36 function formatPrice(amount: number \| null, currency = "INR", cycle?: string \| null); L43 function AgentSubscriptionPage(); L46 callback (inline callback)(item); L117 callback (inline callback)(plan); L128 callback (inline callback)(benefit); L156 function Metric({ icon, label, value, detail }: { icon: ReactNode; label: string; value: number; detail: string }); L160 function HistoryList({ title, rows, empty }: { title: string; rows: Array<Record<string, any>>; empty: string }); L164 callback (inline callback)(row, index) |
| `components/associate/agent-subscription-summary-card.tsx` | TSX / React · 3,194 bytes · 59 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AgentSubscriptionSummaryCard<br>imports: next/link, swr, lucide-react, @/components/ui/badge, @/components/ui/button, @/components/ui/card, @/components/ui/progress<br>functions/methods (2): L16 callback async fetcher(url: string): Promise<SubscriptionSummary>; L23 function AgentSubscriptionSummaryCard() |
| `components/associate/associate-dashboard-nav.tsx` | TSX / React · 2,490 bytes · 64 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AssociateDashboardNav<br>imports: next/link, next/navigation, @/components/ui/button, lucide-react<br>functions/methods (4): L8 function AssociateDashboardNav(); L12 callback async handleLogout(); L17 callback isActive(href: string); L36 callback (inline callback)(item) |
| `components/associate/leads-list.tsx` | TSX / React · 22,311 bytes · 576 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AssociateLeadsList<br>imports: react, @/components/ui/table, @/components/ui/button, @/components/ui/input, @/components/ui/select, @/components/ui/dialog, @/components/ui/textarea, @/components/ui/badge, @/components/ui/card, lucide-react, @/lib/models<br>functions/methods (21): L81 function AssociateLeadsList(); L100 callback async (inline callback)(); L126 callback (inline callback)(); L130 callback async handleStatusChange(leadId: string, newStatus: LeadStatus); L149 callback async handleAddNote(); L175 callback formatDate(date: string \| Date); L183 callback formatTime(date: string \| Date); L266 callback (inline callback)(e); L274 callback (inline callback)(v); L288 callback (inline callback)(v); L300 callback (inline callback)(); L330 callback (inline callback)(lead); L367 callback (inline callback)(v); L420 callback (inline callback)(); L432 callback (inline callback)(); L460 callback (inline callback)(); L460 callback (inline callback)(p); L471 callback (inline callback)(); L471 callback (inline callback)(p); L492 callback (inline callback)(note, i); L510 callback (inline callback)(e) |
| `components/auth/apple-sign-in-button.tsx` | TSX / React · 3,220 bytes · 85 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AppleSignInButton<br>imports: react, @/components/ui/button<br>functions/methods (3): L13 function AppleSignInButton({ mode, userType = "customer", disabled = false, onError }: AppleSignInButtonProps); L16 callback handleAppleSignIn(); L29 callback async callback(result) |
| `components/auth/google-sign-in-button.tsx` | TSX / React · 4,819 bytes · 137 lines | Reusable UI component or feature-specific presentation module<br>exports: default function GoogleSignInButton<br>imports: react, next/navigation, firebase/auth, @/lib/firebase, @/components/ui/button<br>functions/methods (2): L16 function GoogleSignInButton({ mode = "login", userType = "customer", onSuccess, onError, }: GoogleSignInButtonProps); L46 callback async handleGoogleSignIn() |
| `components/auth/list-land-promo.tsx` | TSX / React · 4,654 bytes · 110 lines | Reusable UI component or feature-specific presentation module<br>exports: default function ListLandPromo<br>imports: next/link, @/components/sections/youtube-facade, lucide-react<br>functions/methods (3): L29 function ListLandPromo(); L70 callback (inline callback)(step, index); L92 callback (inline callback)(stat) |
| `components/blog/block-editor/editor-canvas.tsx` | TSX / React · 38,185 bytes · 1037 lines | Reusable UI component or feature-specific presentation module<br>exports: function EditorCanvas<br>imports: @tiptap/react, @tiptap/pm/state, @tiptap/starter-kit, @tiptap/extension-placeholder, @tiptap/extension-image, @tiptap/extension-link, @tiptap/extension-text-align, @tiptap/extension-underline, @tiptap/extension-table, @tiptap/extension-table-row, @tiptap/extension-table-cell, @tiptap/extension-table-header, … (19 total)<br>functions/methods (74): L12 method addAttributes(); L17 callback parseHTML(element); L18 callback renderHTML(attributes); L80 function TableSizePicker({ onSelect, onClose }: { onSelect: (rows: number, cols: number) => void onClose: () => void }); L101 callback (inline callback)(); L103 callback (inline callback)(_, rowIdx); L104 callback (inline callback)(_, colIdx); L114 callback (inline callback)(); L115 callback (inline callback)(); L127 callback (inline callback)(); L143 function EditorCanvas({ content, onChange, placeholder = "Start writing or type '/' to insert a block...", className, onBlockSelect, onEditorReady }: EditorCanvasProps); L214 callback placeholder({ node }); L245 callback onUpdate({ editor }); L248 callback onSelectionUpdate({ editor }); L292 callback (inline callback)(prev); L316 callback handleClick(view, pos, event); L346 callback handleKeyDown(view, event); L421 callback (inline callback)(prev); L426 callback (inline callback)(prev); L451 callback (inline callback)(prev); L455 callback (inline callback)(prev); L503 callback (inline callback)(query: string); L507 callback (inline callback)(b); L510 callback (inline callback)(k); L515 callback async (inline callback)(file: File); L538 callback (inline callback)(); L539 callback handleDrop(e: DragEvent); L550 callback (inline callback)(e); L552 callback (inline callback)(); L560 callback (inline callback)(); L567 callback (inline callback)(); L568 callback handleClick(); L576 callback (inline callback)(); L580 callback (inline callback)(); L581 callback handleClick(e: MouseEvent); L590 callback (inline callback)(); L593 callback (inline callback)(type: string, tableRows?: number, tableCols?: number); L652 callback (inline callback)(e); L674 callback (inline callback)(); L683 callback (inline callback)(); L703 callback (inline callback)(e); L728 callback (inline callback)(); L736 callback (inline callback)(); L744 callback (inline callback)(); L752 callback (inline callback)(); L764 callback (inline callback)(); L772 callback (inline callback)(); L780 callback (inline callback)(); L788 callback (inline callback)(); L800 callback (inline callback)(); L808 callback (inline callback)(); L816 callback (inline callback)(); L824 callback (inline callback)(); L836 callback (inline callback)(); L853 callback (inline callback)(); L863 callback (inline callback)(el); L864 callback (inline callback)(); L864 callback (inline callback)(v); L874 callback (inline callback)(rows, cols); L877 callback (inline callback)(); L884 callback (inline callback)(); L896 callback (inline callback)(); L904 callback (inline callback)(); L912 callback (inline callback)(); L920 callback (inline callback)(); L949 callback (inline callback)(e); L960 callback (inline callback)(); L972 callback (inline callback)(block, idx); L978 callback (inline callback)(e); L983 callback (inline callback)(); L998 callback (inline callback)(rows, cols); L999 callback (inline callback)(); L1008 callback (inline callback)(e); L1013 callback (inline callback)() |
| `components/blog/block-editor/floating-toolbar.tsx` | TSX / React · 9,861 bytes · 303 lines | Reusable UI component or feature-specific presentation module<br>exports: function FloatingToolbar<br>imports: @tiptap/core, @/lib/utils, lucide-react, react<br>functions/methods (23): L28 function FloatingToolbar({ editor, position, blockType }: FloatingToolbarProps); L36 callback (inline callback)(); L37 callback handleClickOutside(e: MouseEvent); L43 callback (inline callback)(); L57 callback getImagePos(): number \| null; L66 callback handleImageSize(width: string); L76 callback handleImagePixelSize(widthPx: number); L86 callback handleCustomSizeApply(); L121 callback (inline callback)(); L133 callback (inline callback)(opt); L137 callback (inline callback)(); L150 callback (inline callback)(px); L154 callback (inline callback)(); L170 callback (inline callback)(e); L177 callback (inline callback)(); L189 callback (inline callback)(e); L212 callback (inline callback)(); L232 callback (inline callback)(); L243 callback (inline callback)(); L254 callback (inline callback)(); L265 callback (inline callback)(); L280 callback (inline callback)(); L292 callback (inline callback)() |
| `components/blog/block-editor/index.tsx` | TSX / React · 169 bytes · 5 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export from ./editor-canvas, re-export from ./floating-toolbar, re-export from ./sidebar-inspector |
| `components/blog/block-editor/sidebar-inspector.tsx` | TSX / React · 24,490 bytes · 678 lines | Reusable UI component or feature-specific presentation module<br>exports: function SidebarInspector<br>imports: @tiptap/core, @/lib/utils, react, lucide-react<br>functions/methods (38): L36 function CollapsibleSection({ title, icon: Icon, children, defaultOpen = true }: { title: string icon: React.ElementType children: React.ReactNode defaultOpen?: boolean }); L53 callback (inline callback)(); L76 function ColorPicker({ label, value, onChange }: { label: string value: string onChange: (color: string) => void }); L98 callback (inline callback)(e); L104 callback (inline callback)(e); L110 callback (inline callback)(color); L114 callback (inline callback)(); L128 function FontSizeSelector({ value, onChange }: { value: string onChange: (size: string) => void }); L150 callback (inline callback)(e); L153 callback (inline callback)(size); L163 function SidebarInspector({ editor, activeBlock, onClose }: SidebarInspectorProps); L166 callback getBlockName(); L184 callback renderBlockSettings(); L201 callback (inline callback)(size); L214 callback (inline callback)(align); L218 callback (inline callback)(); L257 callback (inline callback)(color); L262 callback (inline callback)(color); L301 callback getImagePos(): number \| null; L309 callback (inline callback)(node, pos); L317 callback handleImageSizeChange(width: string, height: string); L334 callback handlePresetSize(width: number); L343 callback handlePercentSize(percent: string); L361 callback (inline callback)(e); L378 callback (inline callback)(size); L382 callback (inline callback)(); L395 callback (inline callback)(size); L399 callback (inline callback)(); L419 callback (inline callback)(e); L420 callback (inline callback)(e); L435 callback (inline callback)(e); L436 callback (inline callback)(e); L501 callback (inline callback)(); L508 callback (inline callback)(); L515 callback (inline callback)(); L522 callback (inline callback)(); L592 callback (inline callback)(); L604 callback (inline callback)() |
| `components/blog/blog-grid.tsx` | TSX / React · 3,312 bytes · 97 lines | Reusable UI component or feature-specific presentation module<br>exports: default function BlogGrid<br>imports: react, next/link, next/image, @/components/ui/card<br>functions/methods (4): L21 function BlogGrid(); L25 callback (inline callback)(); L26 callback async fetchPosts(); L57 callback (inline callback)(post) |
| `components/blog/editor-toolbar.tsx` | TSX / React · 19,037 bytes · 606 lines | Reusable UI component or feature-specific presentation module<br>exports: function EditorToolbar<br>imports: react, react, @tiptap/core, @/components/ui/toggle, @/components/ui/button, @/components/ui/separator, @/components/ui/input, @/components/ui/label, @/components/ui/tooltip, @/components/ui/popover, @/components/ui/dropdown-menu, lucide-react<br>functions/methods (48): L63 function ToggleButton({ tooltip, pressed, onToggle, disabled, children }: ToggleButtonProps); L90 function ActionButton({ tooltip, onClick, disabled, children }: ActionButtonProps); L111 function ToolbarSeparator(); L117 function LinkPopover({ editor }: { editor: Editor }); L122 callback handleOpen(isOpen: boolean); L127 callback (inline callback)(); L135 callback (inline callback)(); L163 callback (inline callback)(e); L164 callback (inline callback)(e); L191 function ImagePopover({ editor }: { editor: Editor }); L197 callback (inline callback)(); L206 callback async (inline callback)(e: React.ChangeEvent<HTMLInputElement>); L259 callback (inline callback)(e); L260 callback (inline callback)(e); L280 callback (inline callback)(e); L314 function TableMenu({ editor }: { editor: Editor }); L332 callback (inline callback)(); L341 callback (inline callback)(); L347 callback (inline callback)(); L353 callback (inline callback)(); L360 callback (inline callback)(); L366 callback (inline callback)(); L372 callback (inline callback)(); L379 callback (inline callback)(); L393 function ColorPickerButton({ editor }: { editor: Editor }); L411 callback (inline callback)(e); L423 function EditorToolbar({ editor }: { editor: Editor }); L429 callback (inline callback)(); L436 callback (inline callback)(); L448 callback (inline callback)(); L455 callback (inline callback)(); L462 callback (inline callback)(); L469 callback (inline callback)(); L476 callback (inline callback)(); L488 callback (inline callback)(); L495 callback (inline callback)(); L502 callback (inline callback)(); L509 callback (inline callback)(); L520 callback (inline callback)(); L527 callback (inline callback)(); L534 callback (inline callback)(); L541 callback (inline callback)(); L552 callback (inline callback)(); L559 callback (inline callback)(); L566 callback (inline callback)(); L573 callback (inline callback)(); L583 callback (inline callback)(); L600 callback (inline callback)() |
| `components/blog/rich-text-editor.tsx` | TSX / React · 3,501 bytes · 108 lines | Reusable UI component or feature-specific presentation module<br>exports: default function RichTextEditor<br>imports: @tiptap/react, @tiptap/starter-kit, @tiptap/extension-image, @tiptap/extension-link, @tiptap/extension-placeholder, @tiptap/extension-text-align, @tiptap/extension-underline, @tiptap/extension-text-style, @tiptap/extension-color, @tiptap/extension-table, @tiptap/extension-table-row, @tiptap/extension-table-cell, … (14 total)<br>functions/methods (2): L24 function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps); L75 callback onUpdate({ editor }) |
| `components/blog/table-of-contents.tsx` | TSX / React · 2,673 bytes · 88 lines | Reusable UI component or feature-specific presentation module<br>exports: default function TableOfContents<br>imports: react, @/components/ui/card<br>functions/methods (7): L16 function TableOfContents({ content }: TableOfContentsProps); L19 callback (inline callback)(); L26 callback (inline callback)(heading, index); L62 callback (inline callback)(item); L79 callback (inline callback)(t); L80 callback (inline callback)(t); L81 callback (inline callback)(t) |
| `components/dashboard/dashboard-bottom-nav.tsx` | TSX / React · 4,260 bytes · 137 lines | Reusable UI component or feature-specific presentation module<br>exports: default function DashboardBottomNav<br>imports: next/link, next/navigation, lucide-react<br>functions/methods (4): L34 function getNavItems(userRole: UserRole): NavItem[]; L78 function DashboardBottomNav({ userRole }: DashboardBottomNavProps); L84 callback isActive(href: string); L102 callback (inline callback)(item) |
| `components/dashboard/dashboard-header.tsx` | TSX / React · 6,258 bytes · 181 lines | Reusable UI component or feature-specific presentation module<br>exports: default function DashboardHeader<br>imports: next/link, next/navigation, @/components/ui/button, @/components/ui/avatar, @/components/ui/dropdown-menu, lucide-react<br>functions/methods (8): L21 function DashboardHeader({ userName, userRole }: DashboardHeaderProps); L24 callback async handleLogout(); L29 callback getInitials(name: string); L32 callback (inline callback)(n); L38 callback getRoleBadgeColor(); L51 callback getDashboardPath(); L67 callback getProfilePath(); L83 callback getSettingsPath() |
| `components/dashboard/dashboard-layout-wrapper.tsx` | TSX / React · 2,300 bytes · 70 lines | Reusable UI component or feature-specific presentation module<br>exports: default function DashboardLayoutWrapper<br>imports: react, react, ./dashboard-header, ./unified-sidebar, ./dashboard-bottom-nav, @/components/layout/page-transition, @/components/ui/toaster, @/components/ui/sonner<br>functions/methods (5): L20 function DashboardLayoutWrapper({ children, userRole, userName, }: DashboardLayoutWrapperProps); L28 callback (inline callback)(); L29 callback (inline callback)(mutations); L30 callback (inline callback)(mutation); L44 callback (inline callback)() |
| `components/dashboard/dashboard-nav.tsx` | TSX / React · 2,616 bytes · 83 lines | Reusable UI component or feature-specific presentation module<br>exports: default function DashboardNav<br>imports: next/link, next/navigation, @/components/ui/button<br>functions/methods (3): L11 function DashboardNav({ role }: DashboardNavProps); L15 callback async handleLogout(); L20 callback isActive(href: string) |
| `components/dashboard/dashboard-sidebar.tsx` | TSX / React · 4,004 bytes · 117 lines | Reusable UI component or feature-specific presentation module<br>exports: default function DashboardSidebar<br>imports: next/link, next/navigation, react, @/components/ui/button, lucide-react<br>functions/methods (6): L27 function DashboardSidebar({ userRole, userName }: DashboardSidebarProps); L32 callback async handleLogout(); L37 callback isActive(href: string); L63 callback (inline callback)(); L85 callback (inline callback)(item); L91 callback (inline callback)() |
| `components/dashboard/page-header.tsx` | TSX / React · 1,415 bytes · 58 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PageHeader<br>imports: react, next/navigation, @/components/ui/button, lucide-react<br>functions/methods (2): L17 function PageHeader({ title, description, showBackButton = false, backHref, actions, }: PageHeaderProps); L26 callback handleBack() |
| `components/dashboard/unified-sidebar.tsx` | TSX / React · 10,164 bytes · 300 lines | Reusable UI component or feature-specific presentation module<br>exports: default function UnifiedSidebar<br>imports: react, next/link, next/navigation, react, @/components/ui/button, @/lib/utils, lucide-react<br>functions/methods (13): L60 callback getNavConfig(role: UserRole): NavSection[]; L174 function UnifiedSidebar({ userRole }: UnifiedSidebarProps); L182 callback isActive(href: string); L184 callback toggleSection(title: string); L185 callback (inline callback)(prev); L191 callback SidebarContent(); L199 callback (inline callback)(); L213 callback (inline callback)(section); L218 callback (inline callback)(); L237 callback (inline callback)(item); L244 callback (inline callback)(); L273 callback (inline callback)(); L283 callback (inline callback)() |
| `components/debug/LinkValidatorDebug.tsx` | TSX / React · 2,177 bytes · 69 lines | Reusable UI component or feature-specific presentation module<br>exports: function LinkValidatorDebug<br>imports: @/lib/link-validator, react<br>functions/methods (3): L19 function LinkValidatorDebug({ links, showInProduction = false }: LinkValidatorDebugProps); L23 callback (inline callback)(); L55 callback (inline callback)(link, idx) |
| `components/forms/admin-login-form.tsx` | TSX / React · 2,853 bytes · 95 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AdminLoginForm<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input<br>functions/methods (4): L9 function AdminLoginForm(); L15 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L17 callback (inline callback)(prev); L20 callback async handleSubmit(e: React.FormEvent) |
| `components/forms/admin-register-form.tsx` | TSX / React · 4,976 bytes · 178 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AdminRegisterForm<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input<br>functions/methods (4): L9 function AdminRegisterForm(); L22 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L24 callback (inline callback)(prev); L27 callback async handleSubmit(e: React.FormEvent) |
| `components/forms/agent-login-form.tsx` | TSX / React · 2,683 bytes · 93 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AssociateLoginForm<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input<br>functions/methods (4): L9 function AssociateLoginForm(); L15 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L17 callback (inline callback)(prev); L20 callback async handleSubmit(e: React.FormEvent) |
| `components/forms/agent-register-form.tsx` | TSX / React · 5,911 bytes · 198 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AssociateRegisterForm<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input, sonner, @/lib/agreement-links<br>functions/methods (7): L11 function AssociateRegisterForm(); L25 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L27 callback (inline callback)(prev); L30 callback handleAgreementChange(agreementId: string, accepted: boolean); L31 callback (inline callback)(prev); L34 callback async handleSubmit(e: React.FormEvent); L50 callback (inline callback)(accepted) |
| `components/forms/agreement-checkbox.tsx` | TSX / React · 2,165 bytes · 64 lines | Reusable UI component or feature-specific presentation module<br>exports: function AgreementCheckbox<br>imports: react, @/components/ui/checkbox, lucide-react, @/lib/agreement-links<br>functions/methods (4): L14 function AgreementCheckbox({ userType, agreementAccepted, onAgreementChange, }: AgreementCheckboxProps); L29 callback (inline callback)(agreement); L37 callback (inline callback)(checked); L51 callback (inline callback)(e) |
| `components/forms/associate-login-form.tsx` | TSX / React · 2,826 bytes · 95 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AssociateLoginForm<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input<br>functions/methods (4): L9 function AssociateLoginForm(); L15 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L17 callback (inline callback)(prev); L20 callback async handleSubmit(e: React.FormEvent) |
| `components/forms/associate-register-form.tsx` | TSX / React · 5,080 bytes · 180 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AssociateRegisterForm<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input, sonner<br>functions/methods (4): L10 function AssociateRegisterForm(); L23 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L25 callback (inline callback)(prev); L28 callback async handleSubmit(e: React.FormEvent) |
| `components/forms/contact-form.tsx` | TSX / React · 4,477 bytes · 158 lines | Reusable UI component or feature-specific presentation module<br>exports: default function ContactForm<br>imports: react, react, @/components/ui/button, @/components/ui/input, @/components/ui/textarea, sonner<br>functions/methods (5): L19 function ContactForm(); L31 callback handleChange(e: React.ChangeEvent<HTMLInputElement \| HTMLTextAreaElement>); L33 callback (inline callback)(prev); L36 callback async handleSubmit(e: React.FormEvent); L56 callback (inline callback)() |
| `components/forms/document-upload-field.tsx` | TSX / React · 6,140 bytes · 176 lines | Reusable UI component or feature-specific presentation module<br>exports: default function DocumentUploadField<br>imports: react, lucide-react, @/components/ui/button, @/lib/models<br>functions/methods (6): L11 function DocumentUploadField({ label, hint, value, onChange, }: { label: string hint: string value?: LandDocumentFile onChange: (doc: LandDocumentFile \| undefined) => void }); L29 callback async handleFile(file: File); L69 callback onInputChange(e: React.ChangeEvent<HTMLInputElement>); L100 callback (inline callback)(); L151 callback (inline callback)(); L163 callback (inline callback)() |
| `components/forms/login-form.tsx` | TSX / React · 4,005 bytes · 126 lines | Reusable UI component or feature-specific presentation module<br>exports: default function LoginForm<br>imports: react, react, next/navigation, @/components/ui/button, @/components/ui/input, @/components/auth/google-sign-in-button, @/components/auth/apple-sign-in-button<br>functions/methods (6): L11 function LoginForm(); L19 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L21 callback (inline callback)(prev); L24 callback async handleSubmit(e: React.FormEvent); L111 callback (inline callback)(err); L118 callback (inline callback)(err) |
| `components/forms/property-form-multistep.tsx` | TSX / React · 10,083 bytes · 283 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PropertyFormMultiStep<br>imports: react, next/navigation, @/components/ui/button, lucide-react, ./property-form-step-1, ./property-form-step-2, ./property-form-step-3, ./property-form-step-4<br>functions/methods (9): L12 function PropertyFormMultiStep({ apiEndpoint = "/api/associate/properties", initialData, isEdit = false, onSubmit, // Declare the onSubmit variable here }: { apiEndpoint?: string initialData?: any isEdit?: boolean onSubmit?: () => Promise<void> // Declare the type of onSubmit }); L90 callback normalizeArrayField(value: any): string[]; L110 callback (inline callback)(); L140 callback handleStepChange(field: string, value: any); L141 callback (inline callback)(prev: any); L144 callback handleNext(); L150 callback handlePrev(); L156 callback async handleSubmit(); L230 callback (inline callback)(step, idx) |
| `components/forms/property-form-office-space.tsx` | TSX / React · 52,646 bytes · 1188 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PropertyFormOfficeSpace<br>imports: react, lucide-react, @/lib/utils<br>functions/methods (84): L212 function PropertyFormOfficeSpace({ formData, onChange }: { formData: any onChange: (field: string, value: any) => void }); L224 callback updateOfficeSpace(field: string, value: any); L228 callback updateCommercialLease(field: string, value: any); L235 callback addSeatConfig(); L247 callback updateSeatConfig(index: number, field: string, value: any); L253 callback removeSeatConfig(index: number); L254 callback (inline callback)(_, i); L261 callback toggleAmenity(amenity: string); L263 callback (inline callback)(a); L304 callback (inline callback)(e); L308 callback (inline callback)(type); L318 callback (inline callback)(e); L322 callback (inline callback)(grade); L332 callback (inline callback)(e); L336 callback (inline callback)(opt); L346 callback (inline callback)(e); L350 callback (inline callback)(model); L364 callback (inline callback)(e); L374 callback (inline callback)(e); L384 callback (inline callback)(e); L394 callback (inline callback)(e); L407 callback (inline callback)(e); L417 callback (inline callback)(e); L456 callback (inline callback)(config, index); L462 callback (inline callback)(); L474 callback (inline callback)(e); L477 callback (inline callback)(type); L487 callback (inline callback)(e); L498 callback (inline callback)(e); L509 callback (inline callback)(e); L518 callback (inline callback)(e); L547 callback (inline callback)(e); L557 callback (inline callback)(e); L567 callback (inline callback)(e); L577 callback (inline callback)(e); L590 callback (inline callback)(e); L600 callback (inline callback)(e); L620 callback (inline callback)(e); L624 callback (inline callback)(opt); L636 callback (inline callback)(e); L651 callback (inline callback)(e); L661 callback (inline callback)(e); L676 callback (inline callback)({ key, label }); L689 callback (inline callback)(e); L712 callback (inline callback)(e); L722 callback (inline callback)(e); L735 callback (inline callback)({ key, label }); L748 callback (inline callback)(e); L759 callback (inline callback)(tier); L766 callback (inline callback)(); L768 callback (inline callback)(t); L803 callback (inline callback)(e); L813 callback (inline callback)(e); L823 callback (inline callback)(e); L838 callback (inline callback)({ key, label }); L851 callback (inline callback)(e); L875 callback (inline callback)(e); L885 callback (inline callback)(e); L899 callback (inline callback)({ key, label }); L912 callback (inline callback)(e); L936 callback (inline callback)(e); L946 callback (inline callback)(e); L956 callback (inline callback)(e); L960 callback (inline callback)(opt); L969 callback (inline callback)(e); L973 callback (inline callback)(opt); L986 callback (inline callback)(e); L996 callback (inline callback)(e); L1006 callback (inline callback)(e); L1020 callback (inline callback)({ key, label }); L1033 callback (inline callback)(e); L1047 callback (inline callback)(amenity); L1051 callback (inline callback)(); L1072 callback (inline callback)(); L1086 callback (inline callback)(e); L1090 callback (inline callback)(type); L1100 callback (inline callback)(e); L1110 callback (inline callback)(e); L1123 callback (inline callback)(e); L1133 callback (inline callback)(e); L1143 callback (inline callback)(e); L1153 callback (inline callback)(e); L1166 callback (inline callback)(e); L1176 callback (inline callback)(e) |
| `components/forms/property-form-step-1.tsx` | TSX / React · 19,170 bytes · 448 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PropertyFormStep1<br>imports: react, @/components/ui/combo-select, lucide-react, ./document-upload-field, @/lib/models<br>functions/methods (34): L10 callback generateSlug(text: string): string; L25 function PropertyFormStep1({ formData, onChange }: any); L37 callback (inline callback)(value: string); L47 callback (inline callback)(value: string); L54 callback (inline callback)(); L55 callback async loadDevelopers(); L71 callback (inline callback)(); L72 callback async loadCurrentUser(); L91 callback async handleAddDeveloper(name: string): Promise<Option \| null>; L100 callback (inline callback)(prev); L100 callback (inline callback)(a, b); L109 callback handleDeveloperChange(value: string \| string[]); L111 callback (inline callback)(d); L117 callback (inline callback)(d); L124 callback setDocument(key: LandDocumentKey, doc: LandDocumentFile \| undefined); L147 callback (inline callback)(e); L160 callback (inline callback)(e); L183 callback (inline callback)(e); L205 callback (inline callback)(e); L213 callback (inline callback)(); L235 callback (inline callback)(e); L269 callback (inline callback)(e); L285 callback (inline callback)(e); L304 callback (inline callback)(e); L325 callback (inline callback)(e); L343 callback (inline callback)(e); L358 callback (inline callback)(feature); L366 callback (inline callback)(e); L381 callback (inline callback)(e); L386 callback (inline callback)(item: string); L387 callback (inline callback)(item: string); L414 callback (inline callback)(e); L435 callback (inline callback)(doc); L441 callback (inline callback)(file) |
| `components/forms/property-form-step-2.tsx` | TSX / React · 13,592 bytes · 313 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PropertyFormStep2<br>imports: react, @/lib/utils<br>functions/methods (19): L31 function PropertyFormStep2({ formData, onChange }: any); L33 callback getPricePreview(value: number \| string \| undefined); L46 callback (inline callback)(); L60 callback (inline callback)(); L85 callback (inline callback)(e); L103 callback (inline callback)(e); L112 callback (inline callback)(e); L146 callback (inline callback)(e); L178 callback (inline callback)(e); L184 callback (inline callback)(e); L198 callback (inline callback)(e); L211 callback (inline callback)(e); L229 callback (inline callback)(e); L239 callback (inline callback)(e); L257 callback (inline callback)(feature); L265 callback (inline callback)(e); L279 callback (inline callback)(e); L294 callback (inline callback)(e); L304 callback (inline callback)(e) |
| `components/forms/property-form-step-3.tsx` | TSX / React · 7,265 bytes · 209 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PropertyFormStep3<br>imports: react, @/components/ui/combo-select, lucide-react<br>functions/methods (18): L13 function PropertyFormStep3({ formData, onChange }: any); L19 callback (inline callback)(); L20 callback async loadStates(); L33 callback async loadLocations(); L50 callback async handleAddState(name: string): Promise<Option \| null>; L59 callback (inline callback)(prev); L59 callback (inline callback)(a, b); L68 callback async handleAddLocation(name: string): Promise<Option \| null>; L81 callback (inline callback)(prev); L81 callback (inline callback)(a, b); L90 callback handleStateChange(value: string \| string[]); L95 callback handleLocationChange(value: string \| string[]); L113 callback (inline callback)(e); L151 callback (inline callback)(e); L165 callback (inline callback)(e); L175 callback (inline callback)(e); L188 callback (inline callback)(e); L199 callback (inline callback)(e) |
| `components/forms/property-form-step-4.tsx` | TSX / React · 16,950 bytes · 457 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PropertyFormStep4<br>imports: react, react, lucide-react, @/lib/utils<br>functions/methods (23): L15 function PropertyFormStep4({ formData, onChange }: any); L20 callback async handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, fieldName: string, isMultiple = false); L28 callback (inline callback)(prev); L29 callback (inline callback)(prev); L38 callback (inline callback)(prev); L53 callback (inline callback)(); L66 callback (inline callback)(prev); L87 callback (inline callback)(img); L97 callback (inline callback)(prev); L102 callback (inline callback)(prev); L103 callback (inline callback)(prev); L108 callback removeImage(fieldName: string, index?: number); L132 callback formatFileSize(bytes?: number); L139 callback getImageMeta(fieldName: string, index?: number): UploadedImage \| null; L147 callback SingleImageUpload({ fieldName, title, description, height = "h-48", }: { fieldName: string title: string description: string height?: string }); L196 callback (inline callback)(); L245 callback (inline callback)(e); L256 callback MultipleImageUpload({ fieldName, title, description, }: { fieldName: string title: string description: string }); L305 callback (inline callback)(url: string, index: number); L318 callback (inline callback)(); L356 callback (inline callback)(e); L403 callback (inline callback)(e); L420 callback (inline callback)(e) |
| `components/forms/property-form-wrapper.tsx` | TSX / React · 562 bytes · 21 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PropertyFormWrapper<br>imports: react<br>functions/methods (1): L11 function PropertyFormWrapper({ title, description, children }: PropertyFormWrapperProps) |
| `components/forms/quote-form.tsx` | TSX / React · 7,396 bytes · 235 lines | Reusable UI component or feature-specific presentation module<br>exports: default function QuoteForm<br>imports: react, react, @/components/ui/button, @/components/ui/input, @/components/ui/textarea, sonner<br>functions/methods (5): L22 function QuoteForm(); L37 callback handleChange(e: React.ChangeEvent<HTMLInputElement \| HTMLTextAreaElement \| HTMLSelectElement>); L39 callback (inline callback)(prev); L42 callback async handleSubmit(e: React.FormEvent); L71 callback (inline callback)() |
| `components/forms/register-form.tsx` | TSX / React · 7,993 bytes · 251 lines | Reusable UI component or feature-specific presentation module<br>exports: default function RegisterForm<br>imports: react, react, next/navigation, next/link, @/components/ui/button, @/components/ui/input, @/components/ui/select, @/components/auth/google-sign-in-button, @/components/auth/apple-sign-in-button, sonner, @/lib/agreement-links<br>functions/methods (9): L15 function RegisterForm(); L31 callback handleChange(e: React.ChangeEvent<HTMLInputElement>); L33 callback (inline callback)(prev); L36 callback handleUserTypeChange(value: string); L37 callback (inline callback)(prev); L40 callback async handleSubmit(e: React.FormEvent); L196 callback (inline callback)(event); L233 callback (inline callback)(err); L242 callback (inline callback)(err) |
| `components/land/category-faqs.tsx` | TSX / React · 2,035 bytes · 46 lines | Reusable UI component or feature-specific presentation module<br>exports: default function CategoryFAQs<br>imports: react, lucide-react, @/lib/category-faqs<br>functions/methods (4): L7 function CategoryFAQs({ faqs }: { faqs: CategoryFAQ[] }); L12 callback (inline callback)(faq, index); L20 callback (inline callback)(); L30 callback (inline callback)(point) |
| `components/land/land-type-listings.tsx` | TSX / React · 5,319 bytes · 151 lines | Reusable UI component or feature-specific presentation module<br>exports: default function LandTypeListings<br>imports: next/link, swr, lucide-react, @/lib/utils, @/lib/land-types-content<br>functions/methods (7): L9 callback fetcher(url: string); L9 callback (inline callback)(res); L30 function formatArea(listing: Listing): string \| null; L38 function LandCard({ listing }: { listing: Listing }); L102 function LandTypeListings({ landType, label }: { landType: string; label: string }); L114 callback (inline callback)(_, i); L146 callback (inline callback)(listing) |
| `components/layout/bottom-nav.tsx` | TSX / React · 9,850 bytes · 337 lines | Reusable UI component or feature-specific presentation module<br>exports: default function BottomNav<br>imports: react, next/link, next/navigation, lucide-react<br>functions/methods (5): L22 function BottomNav(); L31 callback (inline callback)(); L35 callback async checkAuth(); L67 callback (inline callback)(); L81 callback isActive(path: string) |
| `components/layout/custom-head-tags.tsx` | TSX / React · 2,792 bytes · 85 lines | Reusable UI component or feature-specific presentation module<br>exports: default function CustomHeadTags<br>imports: @/lib/mongodb<br>functions/methods (6): L9 function async getActiveHeadTags(): Promise<HeadTag[]>; L19 callback (inline callback)(tag); L31 function shouldBlockTag(tagContent: string): boolean; L53 function async CustomHeadTags(); L59 callback (inline callback)(tag); L71 callback (inline callback)(tag) |
| `components/layout/footer.tsx` | TSX / React · 17,359 bytes · 339 lines | Reusable UI component or feature-specific presentation module<br>exports: default function Footer<br>imports: react, next/image, next/link, react, react-dom, lucide-react, sonner, @/lib/link-validator<br>functions/methods (19): L12 function Footer(); L22 callback (inline callback)(); L26 callback (inline callback)(); L29 callback (inline callback)(); L30 callback (inline callback)(); L33 callback toggleSection(section: string); L34 callback (inline callback)(prev); L40 callback async handleFormSubmit(e: React.FormEvent); L66 callback (inline callback)(); L83 callback PinterestIcon({ size = 18 }: { size?: number }); L154 callback FooterSection({ title, items, sectionKey, }: { title: string; items: { name: string; href: string }[]; sectionKey: string }); L164 callback (inline callback)(); L174 callback (inline callback)(item, idx); L237 callback (inline callback)(social); L276 callback (inline callback)(); L282 callback (inline callback)(e); L282 callback (inline callback)(prev); L283 callback (inline callback)(e); L283 callback (inline callback)(prev) |
| `components/layout/frontend-layout.tsx` | TSX / React · 2,472 bytes · 69 lines | Reusable UI component or feature-specific presentation module<br>exports: default function FrontendLayout<br>imports: react, react, next/navigation, ./mega-menu-header, @/components/mobile/median-app-header, ./navigation-progress, ./route-prefetcher, @/components/mobile/median-bridge, @/components/mobile/android-app-download-prompt, @/components/mobile/pull-to-refresh, ./page-transition, @/components/ui/sonner<br>functions/methods (4): L17 callback (inline callback)(); L18 callback (inline callback)(); L19 callback (inline callback)(); L21 function FrontendLayout({ children, isMedianApp }: { children: React.ReactNode; isMedianApp: boolean }) |
| `components/layout/head-tags-injector.tsx` | TSX / React · 2,396 bytes · 71 lines | Reusable UI component or feature-specific presentation module<br>exports: default function HeadTagsInjector<br>imports: react<br>functions/methods (3): L5 function HeadTagsInjector(); L6 callback (inline callback)(); L24 callback (inline callback)(child) |
| `components/layout/header-search.tsx` | TSX / React · 7,319 bytes · 192 lines | Reusable UI component or feature-specific presentation module<br>exports: default function HeaderSearch<br>imports: react, lucide-react, next/navigation<br>functions/methods (21): L14 function HeaderSearch(); L24 callback async (inline callback)(searchTerm: string); L41 callback (inline callback)(); L43 callback (inline callback)(); L46 callback (inline callback)(); L52 callback (inline callback)(); L53 callback handleKeyDown(e: KeyboardEvent); L57 callback (inline callback)(); L66 callback (inline callback)(); L70 callback (inline callback)(); L71 callback handleClickOutside(e: MouseEvent); L77 callback (inline callback)(); L80 callback handleSearch(); L89 callback handleResultClick(slug: string); L101 callback (inline callback)(); L103 callback (inline callback)(); L127 callback (inline callback)(e); L128 callback (inline callback)(e); L135 callback (inline callback)(); L158 callback (inline callback)(result); L161 callback (inline callback)() |
| `components/layout/header.tsx` | TSX / React · 237 bytes · 7 lines | Reusable UI component or feature-specific presentation module<br>exports: default function Header<br>functions/methods (1): L5 function Header() |
| `components/layout/mega-menu-header.tsx` | TSX / React · 15,978 bytes · 406 lines | Reusable UI component or feature-specific presentation module<br>exports: default function MegaMenuHeader<br>imports: react, next/link, next/image, lucide-react, @/components/ui/button, @/components/ui/dropdown-menu, ./header-search, @/lib/land-types-content<br>functions/methods (14): L25 callback (inline callback)(t); L27 function MegaMenuHeader(); L35 callback (inline callback)(); L39 callback handleScroll(); L41 callback (inline callback)(); L71 callback (inline callback)(); L74 callback (inline callback)(); L78 callback async checkAuth(); L105 callback async handleLogout(); L111 callback getDashboardLink(); L118 callback getDashboardLabel(); L186 callback (inline callback)(type); L284 callback (inline callback)(); L346 callback (inline callback)(type) |
| `components/layout/navigation-progress.tsx` | TSX / React · 2,950 bytes · 100 lines | Reusable UI component or feature-specific presentation module<br>exports: default function NavigationProgress<br>imports: react, next/navigation<br>functions/methods (9): L13 function NavigationProgress(); L22 callback (inline callback)(); L32 callback (inline callback)(); L37 callback (inline callback)(); L41 callback (inline callback)(); L42 callback handleClick(e: MouseEvent); L58 callback (inline callback)(); L61 function startProgress(); L68 callback (inline callback)() |
| `components/layout/page-transition.tsx` | TSX / React · 1,830 bytes · 58 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PageTransition<br>imports: react, next/navigation<br>functions/methods (6): L17 function PageTransition({ children }: PageTransitionProps); L26 callback (inline callback)(); L27 callback handlePopState(); L31 callback (inline callback)(); L34 callback (inline callback)(); L44 callback (inline callback)(k) |
| `components/layout/product-mega-menu-content.tsx` | TSX / React · 10,468 bytes · 238 lines | Reusable UI component or feature-specific presentation module<br>exports: function LocationMegaMenu, function ProjectMegaMenu<br>imports: react, next/image, next/link, lucide-react<br>functions/methods (6): L122 function LocationMegaMenu(); L127 callback (inline callback)(category); L157 callback (inline callback)(item); L181 function ProjectMegaMenu(); L186 callback (inline callback)(category); L216 callback (inline callback)(item) |
| `components/layout/protected-route.tsx` | TSX / React · 1,497 bytes · 58 lines | Reusable UI component or feature-specific presentation module<br>exports: default function ProtectedRoute<br>imports: react, react, next/navigation, lucide-react<br>functions/methods (3): L14 function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps); L19 callback (inline callback)(); L20 callback async checkAuth() |
| `components/layout/route-prefetcher.tsx` | TSX / React · 763 bytes · 35 lines | Reusable UI component or feature-specific presentation module<br>exports: default function RoutePrefetcher<br>imports: react, next/navigation<br>functions/methods (4): L15 function RoutePrefetcher(); L18 callback (inline callback)(); L20 callback prefetchRoutes(); L21 callback (inline callback)(route) |
| `components/location/connectivity-section.tsx` | TSX / React · 2,989 bytes · 87 lines | Reusable UI component or feature-specific presentation module<br>exports: default function ConnectivitySection<br>imports: lucide-react, @/data/location-content<br>functions/methods (3): L26 function ConnectivitySection({ connectivity, locationName }: ConnectivitySectionProps); L45 callback (inline callback)(item); L54 function ConnectivityCard({ item }: { item: ConnectivityCardType }) |
| `components/location/faq-section.tsx` | TSX / React · 2,809 bytes · 87 lines | Reusable UI component or feature-specific presentation module<br>exports: default function FAQSection<br>imports: react, lucide-react, @/lib/utils, @/data/location-content<br>functions/methods (4): L13 function FAQSection({ faqs, locationName }: FAQSectionProps); L32 callback (inline callback)(faq, index); L55 function FAQItem({ faq }: { faq: FAQ }); L61 callback (inline callback)() |
| `components/location/featured-projects-section.tsx` | TSX / React · 4,975 bytes · 122 lines | Reusable UI component or feature-specific presentation module<br>exports: default function FeaturedProjectsSection<br>imports: lucide-react, @/data/location-content<br>functions/methods (4): L11 function FeaturedProjectsSection({ projects, locationName }: FeaturedProjectsSectionProps); L30 callback (inline callback)(project); L39 function ProjectCard({ project }: { project: FeaturedProject }); L72 callback (inline callback)(highlight) |
| `components/location/index.ts` | TypeScript · 686 bytes · 10 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export from ./location-rich-hero, re-export from ./location-filter-pills, re-export from ./featured-projects-section, re-export from ./why-premium-section, re-export from ./price-trends-section, re-export from ./connectivity-section, re-export from ./nearby-infrastructure-section, re-export from ./faq-section, re-export from ./sector-breakdown-section |
| `components/location/location-filter-pills.tsx` | TSX / React · 1,275 bytes · 42 lines | Reusable UI component or feature-specific presentation module<br>exports: default function LocationFilterPills<br>imports: react, @/lib/utils<br>functions/methods (5): L11 function LocationFilterPills({ filters, onFilterChange }: FilterPillsProps); L14 callback toggleFilter(filter: string); L16 callback (inline callback)(f); L25 callback (inline callback)(filter); L28 callback (inline callback)() |
| `components/location/location-rich-hero.tsx` | TSX / React · 4,329 bytes · 113 lines | Reusable UI component or feature-specific presentation module<br>exports: default function LocationRichHero<br>imports: next/image, lucide-react, @/data/location-content<br>functions/methods (4): L13 function LocationRichHero({ content, propertyCount, backgroundImage }: LocationRichHeroProps); L64 callback (inline callback)(stat, index); L95 function getStatIcon(label: string); L103 function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) |
| `components/location/nearby-infrastructure-section.tsx` | TSX / React · 3,474 bytes · 96 lines | Reusable UI component or feature-specific presentation module<br>exports: default function NearbyInfrastructureSection<br>imports: lucide-react, @/data/location-content<br>functions/methods (4): L37 function NearbyInfrastructureSection({ infrastructure, locationName }: NearbyInfrastructureSectionProps); L59 callback (inline callback)(item); L68 function CategoryCard({ item }: { item: NearbyInfrastructure }); L87 callback (inline callback)(name) |
| `components/location/price-trends-section.tsx` | TSX / React · 5,981 bytes · 136 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PriceTrendsSection<br>imports: lucide-react, @/data/location-content, @/lib/utils<br>functions/methods (4): L13 function PriceTrendsSection({ trends, summaryStats, locationName }: PriceTrendsSectionProps); L32 callback (inline callback)(stat, index); L61 callback (inline callback)(trend, index); L117 function AppreciationBadge({ appreciation }: { appreciation: string }) |
| `components/location/sector-breakdown-section.tsx` | TSX / React · 1,849 bytes · 56 lines | Reusable UI component or feature-specific presentation module<br>exports: default function SectorBreakdownSection<br>imports: lucide-react, @/data/location-content<br>functions/methods (3): L11 function SectorBreakdownSection({ sectors, locationName }: SectorBreakdownSectionProps); L32 callback (inline callback)(sector); L41 function SectorCard({ sector }: { sector: SectorBreakdown }) |
| `components/location/why-premium-section.tsx` | TSX / React · 2,914 bytes · 110 lines | Reusable UI component or feature-specific presentation module<br>exports: default function WhyPremiumSection<br>imports: lucide-react, @/data/location-content<br>functions/methods (3): L63 function WhyPremiumSection({ title, cards }: WhyPremiumSectionProps); L82 callback (inline callback)(card); L91 function FeatureCard({ card }: { card: WhyPremiumCard }) |
| `components/mobile/android-app-download-prompt.tsx` | TSX / React · 4,141 bytes · 107 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AndroidAppDownloadPrompt<br>imports: react, lucide-react, @/components/ui/button, @/components/ui/dialog<br>functions/methods (7): L18 function isInstalledApp(); L29 function AndroidAppDownloadPrompt(); L32 callback (inline callback)(); L42 callback (inline callback)(); L43 callback (inline callback)(); L46 callback dismiss(); L58 callback (inline callback)(nextOpen) |
| `components/mobile/hide-in-ios-app.tsx` | TSX / React · 756 bytes · 21 lines | Reusable UI component or feature-specific presentation module<br>exports: function HideInIosApp, function HideInNativeApp<br>imports: react, @/lib/median<br>functions/methods (2): L10 function HideInIosApp({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }); L17 function HideInNativeApp({ children }: { children: ReactNode }) |
| `components/mobile/median-app-header.tsx` | TSX / React · 3,797 bytes · 95 lines | Reusable UI component or feature-specific presentation module<br>exports: default function MedianAppHeader<br>imports: next/image, next/link, lucide-react<br>functions/methods (1): L6 function MedianAppHeader() |
| `components/mobile/median-bridge.tsx` | TSX / React · 6,843 bytes · 195 lines | Reusable UI component or feature-specific presentation module<br>exports: default function MedianBridge<br>imports: react<br>functions/methods (15): L60 function detectAppContext(): { isMedian: boolean isIOS: boolean isAndroid: boolean isStandalone: boolean }; L88 function MedianBridge(); L89 callback (inline callback)(); L104 callback (inline callback)(); L120 callback (inline callback)(); L127 callback (inline callback)(); L134 callback (inline callback)(); L139 callback (inline callback)(result); L147 callback (inline callback)(); L158 callback (inline callback)(); L164 callback (inline callback)(); L171 callback (inline callback)(); L176 callback (inline callback)(info); L180 callback (inline callback)(); L191 callback (inline callback)() |
| `components/mobile/median-home-page.tsx` | TSX / React · 12,424 bytes · 378 lines | Reusable UI component or feature-specific presentation module<br>exports: default function MedianHomePage<br>imports: next/image, next/link, lucide-react, @/components/ui/button, @/components/mobile/median-property-feed, @/components/mobile/median-popular-locations<br>functions/methods (3): L66 function MedianHomePage(); L166 callback (inline callback)({ name, href, icon: Icon }, index); L332 callback (inline callback)({ title, description, href, icon: Icon }) |
| `components/mobile/median-popular-locations.tsx` | TSX / React · 6,200 bytes · 201 lines | Reusable UI component or feature-specific presentation module<br>exports: default function MedianPopularLocations<br>imports: next/link, swr, lucide-react<br>functions/methods (6): L25 callback async fetcher(url: string): Promise<PropertyResponse>; L35 function LocationSkeleton(); L38 callback (inline callback)(item); L48 function MedianPopularLocations(); L60 callback (inline callback)(map, property); L130 callback (inline callback)(location) |
| `components/mobile/median-property-feed.tsx` | TSX / React · 11,668 bytes · 388 lines | Reusable UI component or feature-specific presentation module<br>exports: default function MedianPropertyFeed<br>imports: next/link, react, swr, lucide-react, @/lib/utils<br>functions/methods (11): L51 callback async fetcher(url: string): Promise<ListingResponse>; L61 function PropertyCard({ listing }: { listing: ListingSummary }); L85 callback (inline callback)(); L92 callback (inline callback)(property); L100 callback toggleSaved(); L107 callback (inline callback)(property); L111 callback (inline callback)(property); L237 function PropertyCardSkeleton({ layout, }: { layout: "carousel" \| "grid" }); L264 function MedianPropertyFeed({ title, description, href, endpoint, emptyMessage, layout = "carousel", }: MedianPropertyFeedProps); L329 callback (inline callback)(item); L359 callback (inline callback)(listing) |
| `components/mobile/onesignal-web-push.tsx` | TSX / React · 1,168 bytes · 34 lines | Reusable UI component or feature-specific presentation module<br>exports: default function OneSignalWebPush<br>imports: next/script, @/lib/median<br>functions/methods (1): L9 function OneSignalWebPush() |
| `components/mobile/pull-to-refresh.tsx` | TSX / React · 3,533 bytes · 107 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PullToRefresh<br>imports: react, lucide-react<br>functions/methods (8): L19 function PullToRefresh(); L27 callback (inline callback)(); L33 callback (inline callback)(); L36 callback onTouchStart(e: TouchEvent); L46 callback onTouchMove(e: TouchEvent); L58 callback onTouchEnd(); L65 callback (inline callback)(); L75 callback (inline callback)() |
| `components/property/brochure-download.tsx` | TSX / React · 1,584 bytes · 44 lines | Reusable UI component or feature-specific presentation module<br>exports: function BrochureDownload<br>imports: lucide-react, @/components/ui/button<br>functions/methods (1): L11 function BrochureDownload({ brochureUrl, propertyName }: BrochureDownloadProps) |
| `components/property/developer-projects.tsx` | TSX / React · 9,317 bytes · 250 lines | Reusable UI component or feature-specific presentation module<br>exports: function DeveloperProjects<br>imports: react, next/link, lucide-react, @/lib/utils, @/components/ui/button<br>functions/methods (5): L39 function DeveloperProjects({ developerId, developerSlug, developerName, excludePropertyId }: DeveloperProjectsProps); L49 callback (inline callback)(); L50 callback async loadDeveloperProjects(); L116 callback (inline callback)(i); L193 callback (inline callback)(project) |
| `components/property/enquiry-form.tsx` | TSX / React · 13,351 bytes · 295 lines | Reusable UI component or feature-specific presentation module<br>exports: function EnquiryForm<br>imports: react, lucide-react, @/components/ui/button, @/lib/utils, sonner, @/components/property/phone-verification<br>functions/methods (21): L16 function EnquiryForm({ propertyId, propertyName, propertySlug }: EnquiryFormProps); L29 callback async handleSubmit(e: React.FormEvent); L94 callback (inline callback)(); L195 callback (inline callback)(e); L195 callback (inline callback)(prev); L196 callback (inline callback)(); L197 callback (inline callback)(); L208 callback (inline callback)(phone); L208 callback (inline callback)(prev); L209 callback (inline callback)(token); L210 callback (inline callback)(); L212 callback (inline callback)(); L213 callback (inline callback)(); L231 callback (inline callback)(e); L231 callback (inline callback)(prev); L232 callback (inline callback)(); L233 callback (inline callback)(); L254 callback (inline callback)(e); L254 callback (inline callback)(prev); L255 callback (inline callback)(); L256 callback (inline callback)() |
| `components/property/floor-plan-tabs.tsx` | TSX / React · 18,201 bytes · 475 lines | Reusable UI component or feature-specific presentation module<br>exports: function FloorPlanTabs<br>imports: react, react-dom, lucide-react, next/image, @/lib/utils<br>functions/methods (43): L21 function FloorPlanTabs({ floorPlans, configurations, units }: FloorPlanTabsProps); L29 callback (inline callback)(); L34 callback formatBHKLabel(type: string): string; L46 callback (inline callback)(unit); L56 callback (inline callback)(config); L57 callback (inline callback)(p); L66 callback (inline callback)(plan); L68 callback (inline callback)(p); L77 callback (inline callback)(e: KeyboardEvent); L84 callback (inline callback)(prev); L87 callback (inline callback)(prev); L90 callback (inline callback)(prev); L92 callback (inline callback)(prev); L98 callback (inline callback)(); L100 callback (inline callback)(); L104 callback (inline callback)(); L110 callback (inline callback)(); L115 callback openLightbox(index: number); L121 callback closeLightbox(); L126 callback nextImage(e?: React.MouseEvent); L128 callback (inline callback)(prev); L132 callback prevImage(e?: React.MouseEvent); L134 callback (inline callback)(prev); L138 callback zoomIn(e?: React.MouseEvent); L140 callback (inline callback)(prev); L143 callback zoomOut(e?: React.MouseEvent); L145 callback (inline callback)(prev); L148 callback resetZoom(e?: React.MouseEvent); L173 callback (inline callback)(e); L235 callback (inline callback)(e); L286 callback (inline callback)(e); L302 callback (inline callback)(plan, index); L305 callback (inline callback)(e); L366 callback (inline callback)(plan, index); L369 callback (inline callback)(); L386 callback (inline callback)(); L404 callback (inline callback)(e); L419 callback (inline callback)(e); L421 callback (inline callback)(prev); L428 callback (inline callback)(e); L430 callback (inline callback)(prev); L452 callback (inline callback)(_, index); L455 callback (inline callback)() |
| `components/property/hero-banner.tsx` | TSX / React · 5,622 bytes · 140 lines | Reusable UI component or feature-specific presentation module<br>exports: function HeroBanner<br>imports: lucide-react, @/lib/utils<br>functions/methods (2): L41 function HeroBanner({ property }: HeroBannerProps); L43 callback formatPrice(price: number) |
| `components/property/index.ts` | TypeScript · 533 bytes · 10 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export from ./hero-banner, re-export from ./project-highlights, re-export from ./units-section, re-export from ./floor-plan-tabs, re-export from ./location-connectivity, re-export from ./developer-projects, re-export from ./property-faq, re-export from ./enquiry-form, re-export from ./brochure-download, re-export from ./office-space-details |
| `components/property/listing-under-review.tsx` | TSX / React · 1,383 bytes · 34 lines | Reusable UI component or feature-specific presentation module<br>exports: default function ListingUnderReview<br>imports: next/link, lucide-react, @/components/layout/header, @/components/layout/footer<br>functions/methods (1): L6 function ListingUnderReview() |
| `components/property/location-connectivity.tsx` | TSX / React · 13,525 bytes · 274 lines | Reusable UI component or feature-specific presentation module<br>exports: function LocationConnectivity<br>imports: lucide-react, @/components/ui/button, @/lib/utils<br>functions/methods (8): L78 function getIconAndColor(type: string, name: string): { icon: LucideIcon; color: string }; L82 callback isExactWordMatch(text: string, keywords: string[]); L83 callback (inline callback)(keyword); L147 function LocationConnectivity({ connectivity, nearby, googleMapLink, address, city, state }: LocationConnectivityProps); L158 callback (inline callback)(item); L163 callback (inline callback)(item); L190 callback (inline callback)(item, index); L192 callback (inline callback)(l) |
| `components/property/location-hero.tsx` | TSX / React · 4,111 bytes · 119 lines | Reusable UI component or feature-specific presentation module<br>exports: default function LocationHero<br>imports: next/image, lucide-react<br>functions/methods (3): L13 function LocationHero({ name, description, featured_image, propertyCount, }: LocationHeroProps); L20 callback getImageUrl(); L51 callback (inline callback)(e) |
| `components/property/luxury-property-card.tsx` | TSX / React · 7,402 bytes · 204 lines | Reusable UI component or feature-specific presentation module<br>exports: default function LuxuryPropertyCard<br>imports: next/image, next/link, lucide-react, @/lib/utils, @/components/ui/whatsapp-button<br>functions/methods (4): L33 function LuxuryPropertyCard({ _id, property_name, slug = _id, main_thumbnail, address, city, bedrooms, bathrooms, carpet_area, super_area, area_sqft, lowest_price, max_price, price_range, project_status, listing_type, property_type, rera_registered, is_featured, }: LuxuryPropertyCardProps); L59 callback getImageUrl(); L75 callback getStatusBadge(); L96 callback (inline callback)(e) |
| `components/property/master-plan-section.tsx` | TSX / React · 13,059 bytes · 394 lines | Reusable UI component or feature-specific presentation module<br>exports: function MasterPlanSection<br>imports: react, react-dom, lucide-react, next/image, @/lib/utils<br>functions/methods (21): L14 function MasterPlanSection({ masterPlan, propertyName }: MasterPlanSectionProps); L20 callback (inline callback)(); L25 callback (inline callback)(e: KeyboardEvent); L31 callback (inline callback)(prev); L33 callback (inline callback)(prev); L39 callback (inline callback)(); L41 callback (inline callback)(); L45 callback (inline callback)(); L51 callback (inline callback)(); L56 callback openLightbox(); L61 callback closeLightbox(); L66 callback zoomInHandler(e?: React.MouseEvent); L68 callback (inline callback)(prev); L71 callback zoomOutHandler(e?: React.MouseEvent); L73 callback (inline callback)(prev); L76 callback resetZoom(e?: React.MouseEvent); L114 callback (inline callback)(e); L237 callback (inline callback)(e); L274 callback (inline callback)(e); L294 callback (inline callback)(e); L354 callback (inline callback)(e) |
| `components/property/office-space-detail-client.tsx` | TSX / React · 38,338 bytes · 879 lines | Reusable UI component or feature-specific presentation module<br>exports: function OfficeSpaceDetailClient<br>imports: react, react-dom, lucide-react, @/components/ui/button, next/link, @/lib/utils, @/hooks/use-recently-viewed, @/components/property/hero-banner, @/components/property/location-connectivity, @/components/property/property-faq<br>functions/methods (29): L90 function OfficeSpaceDetailClient({ property, developer }: OfficeSpaceDetailClientProps); L96 callback (inline callback)(); L98 callback (inline callback)(); L102 callback (inline callback)(); L113 callback (inline callback)(); L131 callback nextImage(); L131 callback (inline callback)(prev); L132 callback prevImage(); L132 callback (inline callback)(prev); L152 callback (inline callback)(stat); L191 callback (inline callback)(_, idx); L194 callback (inline callback)(); L205 callback (inline callback)(); L261 callback (inline callback)(stat, idx); L325 callback (inline callback)(); L401 callback (inline callback)(config: any, idx: number); L464 callback (inline callback)(amenity: string, idx: number); L657 callback (inline callback)(); L660 callback (inline callback)(e); L673 callback (inline callback)(e); L683 callback (inline callback)(e); L698 callback (inline callback)(e); L714 function CompactEnquiryForm({ propertyId, propertyName, propertySlug }: { propertyId?: string propertyName?: string propertySlug?: string }); L731 callback async handleSubmit(e: React.FormEvent); L778 callback (inline callback)(); L806 callback (inline callback)(e); L820 callback (inline callback)(e); L835 callback (inline callback)(e); L845 callback (inline callback)(e) |
| `components/property/office-space-details.tsx` | TSX / React · 21,209 bytes · 500 lines | Reusable UI component or feature-specific presentation module<br>exports: default function OfficeSpaceDetails<br>imports: lucide-react, @/lib/utils<br>functions/methods (3): L130 function OfficeSpaceDetails({ officeSpace, commercialLease, className }: OfficeSpaceDetailsProps); L304 callback (inline callback)(config, index); L369 callback (inline callback)(amenity, index) |
| `components/property/phone-verification.tsx` | TSX / React · 10,204 bytes · 295 lines | Reusable UI component or feature-specific presentation module<br>exports: function PhoneVerification<br>imports: react, lucide-react, @/components/ui/input-otp, @/lib/utils, sonner<br>functions/methods (12): L24 function PhoneVerification({ phone, onPhoneChange, onVerified, onUnverified, focused, onFocus, onBlur, required = true, }: PhoneVerificationProps); L45 callback (inline callback)(); L46 callback (inline callback)(); L51 callback startCooldown(seconds: number); L54 callback (inline callback)(); L55 callback (inline callback)(c); L65 callback async handleSend(); L101 callback async handleVerify(value?: string); L134 callback handleEditPhone(); L174 callback (inline callback)(e); L250 callback (inline callback)(val); L269 callback (inline callback)() |
| `components/property/project-highlights.tsx` | TSX / React · 4,230 bytes · 97 lines | Reusable UI component or feature-specific presentation module<br>exports: function ProjectHighlights<br>imports: lucide-react, @/lib/utils<br>functions/methods (3): L10 function ProjectHighlights({ highlights }: ProjectHighlightsProps); L14 callback getHighlightIcon(index: number); L39 callback (inline callback)(highlight, index) |
| `components/property/property-card.tsx` | TSX / React · 3,842 bytes · 103 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PropertyCard<br>imports: next/link, next/image, lucide-react, @/components/ui/badge, @/lib/utils, @/components/ui/whatsapp-button<br>functions/methods (1): L31 function PropertyCard({ property }: PropertyCardProps) |
| `components/property/property-detail-client.tsx` | TSX / React · 41,345 bytes · 988 lines | Reusable UI component or feature-specific presentation module<br>exports: function PropertyDetailClient<br>imports: react, react-dom, lucide-react, @/components/ui/button, next/link, @/lib/utils, @/hooks/use-recently-viewed, @/components/ui/whatsapp-button, @/components/property/phone-verification, @/components/property/hero-banner, @/components/property/project-highlights, @/components/property/location-connectivity, … (19 total)<br>functions/methods (35): L88 function PropertyDetailClient({ property, developer, propertyTypeSlug = "agricultural", propertyTypeDisplayName = "Agricultural Land", }: PropertyDetailClientProps); L102 callback (inline callback)(); L105 callback (inline callback)(); L109 callback (inline callback)(); L115 callback (inline callback)(); L135 callback nextImage(); L135 callback (inline callback)(prev); L136 callback prevImage(); L136 callback (inline callback)(prev); L223 callback (inline callback)(s); L235 callback (inline callback)(f); L293 callback (inline callback)(); L347 callback (inline callback)(spec, idx); L379 callback (inline callback)(f); L400 callback (inline callback)(); L445 callback (inline callback)(img: string, idx: number); L448 callback (inline callback)(); L469 callback (inline callback)(); L582 callback (inline callback)(); L667 callback (inline callback)(); L670 callback (inline callback)(e); L683 callback (inline callback)(e); L693 callback (inline callback)(e); L708 callback (inline callback)(e); L728 callback (inline callback)(); L732 callback (inline callback)(e); L735 callback (inline callback)(); L772 function PropertyDocuments({ onUnlock }: { onUnlock: () => void }); L783 callback (inline callback)(doc); L822 function CompactEnquiryForm({ propertyId, propertyName, propertySlug, }: { propertyId?: string propertyName?: string propertySlug?: string }); L843 callback async handleSubmit(e: React.FormEvent); L920 callback (inline callback)(); L949 callback (inline callback)(e); L960 callback (inline callback)(token); L961 callback (inline callback)() |
| `components/property/property-faq.tsx` | TSX / React · 3,862 bytes · 103 lines | Reusable UI component or feature-specific presentation module<br>exports: function PropertyFaq<br>imports: react, lucide-react, @/lib/utils<br>functions/methods (4): L16 function PropertyFaq({ faqs }: PropertyFaqProps); L21 callback toggleFaq(index: number); L41 callback (inline callback)(faq, index); L53 callback (inline callback)() |
| `components/property/property-reviews.tsx` | TSX / React · 6,271 bytes · 48 lines | Reusable UI component or feature-specific presentation module<br>exports: function PropertyReviews<br>imports: react, swr, lucide-react, @/components/ui/button, @/components/ui/input, @/components/ui/label, @/components/ui/textarea<br>functions/methods (11): L14 function PropertyReviews({ propertyId }: { propertyId: string }); L15 callback async (inline callback)(url: string); L25 function async submit(event: React.FormEvent<HTMLFormElement>); L33 function async action(reviewId: string, kind: "helpful" \| "report"); L44 callback (inline callback)(event); L44 callback (inline callback)(event); L44 callback (inline callback)(event); L46 callback (inline callback)(review); L46 callback (inline callback)(_, index); L46 callback (inline callback)(); L46 callback (inline callback)() |
| `components/property/property-skeleton.tsx` | TSX / React · 540 bytes · 16 lines | Reusable UI component or feature-specific presentation module<br>exports: function PropertySkeleton<br>functions/methods (1): L1 function PropertySkeleton() |
| `components/property/report-content-dialog.tsx` | TSX / React · 4,491 bytes · 136 lines | Reusable UI component or feature-specific presentation module<br>exports: function ReportContentDialog<br>imports: react, lucide-react, @/components/ui/button, @/components/ui/label, @/components/ui/textarea, @/components/ui/radio-group, @/components/ui/dialog<br>functions/methods (8): L34 function ReportContentDialog({ targetType, targetId, label = "listing" }: ReportContentDialogProps); L40 callback reset(); L46 callback async submit(); L65 callback (inline callback)(next); L89 callback (inline callback)(); L99 callback (inline callback)(r); L114 callback (inline callback)(e); L124 callback (inline callback)() |
| `components/property/special-section.tsx` | TSX / React · 1,828 bytes · 67 lines | Reusable UI component or feature-specific presentation module<br>exports: function SpecialSection, function SpecialSectionsRenderer<br>imports: lucide-react<br>functions/methods (4): L15 function SpecialSection({ section }: SpecialSectionProps); L55 function SpecialSectionsRenderer({ sections, position }: SpecialSectionsRendererProps); L56 callback (inline callback)(s); L62 callback (inline callback)(section) |
| `components/property/units-section.tsx` | TSX / React · 8,191 bytes · 180 lines | Reusable UI component or feature-specific presentation module<br>exports: function UnitsSection<br>imports: lucide-react, @/lib/utils<br>functions/methods (4): L26 function UnitsSection({ units, configurations }: UnitsSectionProps); L30 callback (inline callback)(c); L43 callback (inline callback)(u); L84 callback (inline callback)(unit, index) |
| `components/property/verification-scorecard.tsx` | TSX / React · 4,434 bytes · 119 lines | Reusable UI component or feature-specific presentation module<br>exports: function VerificationScorecard<br>imports: lucide-react, @/lib/utils<br>functions/methods (4): L50 function VerificationScorecard({ className }: VerificationScorecardProps); L67 callback (inline callback)(area); L82 callback (inline callback)(check); L101 callback (inline callback)(layer) |
| `components/rera/rera-status-badge.tsx` | TSX / React · 1,280 bytes · 42 lines | Reusable UI component or feature-specific presentation module<br>exports: const RERA_STATUS_STYLES, default function ReraStatusBadge<br>imports: lucide-react, @/lib/models<br>functions/methods (1): L25 function ReraStatusBadge({ status, className = "", }: { status: ReraRequestStatus className?: string }) |
| `components/search/search-content.tsx` | TSX / React · 11,244 bytes · 247 lines | Reusable UI component or feature-specific presentation module<br>exports: default function SearchContent<br>imports: react, next/navigation, next/link, lucide-react, @/components/ui/button, @/lib/utils<br>functions/methods (21): L10 function SearchContent(); L27 callback (inline callback)(); L28 callback async loadData(); L64 callback handleFilterChange(key: string, value: string); L65 callback (inline callback)(prev); L86 callback (inline callback)(e); L90 callback (inline callback)(state); L101 callback (inline callback)(e); L105 callback (inline callback)(category); L117 callback (inline callback)(e); L121 callback (inline callback)(developer); L133 callback (inline callback)(e); L136 callback (inline callback)(); L141 callback (inline callback)(b); L152 callback (inline callback)(e); L162 callback (inline callback)(e); L180 callback (inline callback)(property); L232 callback (inline callback)(); L232 callback (inline callback)(p); L238 callback (inline callback)(); L238 callback (inline callback)(p) |
| `components/sections/advanced-search.tsx` | TSX / React · 34,208 bytes · 769 lines | Reusable UI component or feature-specific presentation module<br>exports: default function AdvancedSearch<br>imports: react, lucide-react, @/components/ui/button, next/navigation, next/link, @/lib/utils, @/hooks/use-voice-search, @/hooks/use-geolocation<br>functions/methods (55): L38 callback (inline callback)(range); L77 function isNearMeQuery(query: string): boolean; L78 callback (inline callback)(pattern); L116 function AdvancedSearch(); L146 callback async (inline callback)(query: string, location?: GeoLocation \| null); L177 callback async (inline callback)(text: string); L195 callback (inline callback)(); L204 callback (inline callback)(); L214 callback (inline callback)(); L226 callback (inline callback)(); L227 callback (inline callback)(); L238 callback (inline callback)(); L240 callback (inline callback)(); L241 callback (inline callback)(); L243 callback (inline callback)(); L245 callback (inline callback)(); L246 callback (inline callback)(); L248 callback (inline callback)(); L252 callback (inline callback)(); L259 callback (inline callback)(); L265 callback (inline callback)(); L275 callback (inline callback)(prev); L280 callback (inline callback)(); L284 callback (inline callback)(); L287 callback async fetchProperties(); L305 callback (inline callback)(); L306 callback handleClickOutside(event: MouseEvent); L313 callback (inline callback)(); L316 callback (inline callback)(); L326 callback (inline callback)(p); L327 callback (inline callback)(p); L328 callback (inline callback)(p); L332 callback (inline callback)(item); L333 callback (inline callback)(item, index, self); L339 callback handleSearch(); L347 callback handleSuggestionClick(suggestion: string); L355 callback handleVoiceResultClick(property: any); L361 callback closeVoiceResults(); L368 callback getLocationBadge(source: string); L409 callback (inline callback)(e); L414 callback (inline callback)(); L415 callback (inline callback)(e); L457 callback (inline callback)(suggestion, index); L460 callback (inline callback)(); L565 callback (inline callback)(loc, i); L570 callback (inline callback)(type, i); L589 callback (inline callback)(st, i); L594 callback (inline callback)(dev, i); L599 callback (inline callback)(sector, i); L604 callback (inline callback)(amenity, i); L609 callback (inline callback)(type, i); L615 callback (inline callback)(landmark, i); L633 callback (inline callback)(property); L636 callback (inline callback)(); L744 callback (inline callback)(category) |
| `components/sections/banner-image.tsx` | TSX / React · 2,487 bytes · 45 lines | Reusable UI component or feature-specific presentation module<br>exports: default function BannerImage<br>imports: next/link<br>functions/methods (1): L6 function BannerImage() |
| `components/sections/banner-slider.tsx` | TSX / React · 10,157 bytes · 278 lines | Reusable UI component or feature-specific presentation module<br>exports: default export<br>imports: react, next/image, next/link, @/lib/utils, @/components/ui/button, lucide-react<br>functions/methods (25): L62 function FirstSlideStatic(); L87 function SlideContent({ slide, active }: { slide: (typeof slides)[0]; active: boolean }); L136 callback SlideImage({ slide, index, isActive, shouldLoad, }: { slide: (typeof slides)[0] index: number isActive: boolean shouldLoad: boolean }); L175 function BannerSlider(); L182 callback (inline callback)(); L184 callback (inline callback)(); L185 callback (inline callback)(); L186 callback (inline callback)(prev); L190 callback (inline callback)(); L191 callback markHydrated(); L192 callback (inline callback)(); L199 callback (inline callback)(); L202 callback (inline callback)(); L206 callback (inline callback)(); L210 callback (inline callback)(); L215 callback (inline callback)(); L219 callback (inline callback)(); L220 callback (inline callback)(prev); L223 callback (inline callback)(); L228 callback (inline callback)(); L230 callback (inline callback)(prev); L240 callback (inline callback)(slide, index); L262 callback (inline callback)(slide, index); L265 callback (inline callback)(); L265 callback (inline callback)() |
| `components/sections/categories.tsx` | TSX / React · 1,548 bytes · 39 lines | Reusable UI component or feature-specific presentation module<br>exports: default function Categories<br>imports: next/link, lucide-react<br>functions/methods (2): L11 function Categories(); L21 callback (inline callback)(category) |
| `components/sections/category-section.tsx` | TSX / React · 2,634 bytes · 77 lines | Reusable UI component or feature-specific presentation module<br>exports: default function CategorySection<br>imports: react, react, next/link, @/components/ui/button, @/components/property/property-card, @/components/property/property-skeleton, lucide-react<br>functions/methods (5): L20 function CategorySection({ title, category, icon, limit = 4, description }: CategorySectionProps); L24 callback (inline callback)(); L25 callback async fetchProperties(); L54 callback (inline callback)(_, i); L59 callback (inline callback)(property) |
| `components/sections/cta.tsx` | TSX / React · 3,127 bytes · 73 lines | Reusable UI component or feature-specific presentation module<br>exports: default function CTA<br>imports: next/link, @/components/ui/button, lucide-react<br>functions/methods (2): L5 function CTA(); L63 callback (inline callback)(item) |
| `components/sections/dynamic-sections.tsx` | TSX / React · 11,025 bytes · 312 lines | Reusable UI component or feature-specific presentation module<br>exports: default function DynamicSections<br>imports: react, next/link, next/image, lucide-react, @/lib/utils<br>functions/methods (19): L35 function PropertyCardEnhanced({ property, index }: { property: Property; index: number }); L41 callback getImageUrl(); L71 callback (inline callback)(); L72 callback (inline callback)(); L87 callback (inline callback)(); L114 callback (inline callback)(e); L178 function DynamicSections(); L184 callback (inline callback)(); L185 callback async fetchSections(); L202 callback (inline callback)(); L204 callback (inline callback)(entries); L205 callback (inline callback)(entry); L207 callback (inline callback)(prev); L214 callback (inline callback)(ref); L218 callback (inline callback)(); L226 callback (inline callback)(i); L243 callback (inline callback)(section, sectionIndex); L247 callback (inline callback)(el); L291 callback (inline callback)(property, index) |
| `components/sections/faqs.tsx` | TSX / React · 13,644 bytes · 305 lines | Reusable UI component or feature-specific presentation module<br>exports: default function FAQs<br>imports: react, lucide-react, @/lib/utils<br>functions/methods (6): L190 function FAQs(); L193 callback toggle(id: number); L194 callback (inline callback)(prev); L216 callback (inline callback)(faq, index); L221 callback (inline callback)(); L272 callback (inline callback)(point) |
| `components/sections/farm-testimonials.tsx` | TSX / React · 3,621 bytes · 96 lines | Reusable UI component or feature-specific presentation module<br>exports: default function FarmTestimonials<br>imports: next/image, lucide-react<br>functions/methods (3): L41 function FarmTestimonials(); L58 callback (inline callback)(testimonial, index); L65 callback (inline callback)(_, i) |
| `components/sections/featured-developers.tsx` | TSX / React · 7,310 bytes · 217 lines | Reusable UI component or feature-specific presentation module<br>exports: default function FeaturedDevelopers<br>imports: react, next/link, lucide-react, @/lib/utils<br>functions/methods (10): L16 function FeaturedDevelopers(); L20 callback (inline callback)(); L21 callback async fetchDevelopers(); L27 callback (inline callback)(dev: Developer); L28 callback (inline callback)(a: Developer, b: Developer); L51 callback (inline callback)(_, i); L70 callback duplicateRow(row: Developer[]); L148 function MarqueeRow({ developers, direction }: { developers: Developer[] direction: "left" \| "right" }); L164 callback (inline callback)(developer, index); L173 function DeveloperCard({ developer }: { developer: Developer }) |
| `components/sections/featured-listings.tsx` | TSX / React · 5,707 bytes · 136 lines | Reusable UI component or feature-specific presentation module<br>exports: default function FeaturedListings<br>imports: react, next/link, @/components/ui/button, lucide-react, @/lib/utils<br>functions/methods (6): L9 function FeaturedListings(); L13 callback (inline callback)(); L14 callback async fetchProperties(); L36 callback (inline callback)(_, i); L60 callback (inline callback)(property); L69 callback (inline callback)(e) |
| `components/sections/featured-office-spaces.tsx` | TSX / React · 15,690 bytes · 450 lines | Reusable UI component or feature-specific presentation module<br>exports: default function FeaturedOfficeSpaces<br>imports: react, lucide-react, @/lib/utils, next/link<br>functions/methods (10): L89 callback OfficeSpaceCard({ space, index, }: { space: typeof OFFICE_SPACES[0] index: number }); L103 callback (inline callback)(); L105 callback (inline callback)([entry]); L118 callback (inline callback)(); L122 callback (inline callback)(e: React.MouseEvent<HTMLDivElement>); L144 callback (inline callback)(); L163 callback (inline callback)(); L298 callback (inline callback)(feature, i); L384 function FeaturedOfficeSpaces(); L438 callback (inline callback)(space, index) |
| `components/sections/featured-video-properties.tsx` | TSX / React · 10,106 bytes · 301 lines | Reusable UI component or feature-specific presentation module<br>exports: default function FeaturedVideoProperties<br>imports: react, lucide-react, @/lib/utils, next/link<br>functions/methods (8): L63 callback PropertyVideoCard({ property, index }: { property: typeof FEATURED_PROPERTIES[0]; index: number }); L70 callback (inline callback)(); L72 callback (inline callback)([entry]); L85 callback (inline callback)(); L100 callback (inline callback)(); L101 callback (inline callback)(); L254 function FeaturedVideoProperties(); L294 callback (inline callback)(property, index) |
| `components/sections/handpicked-selections.tsx` | TSX / React · 2,465 bytes · 69 lines | Reusable UI component or feature-specific presentation module<br>exports: default function HandpickedSelections<br>imports: react, next/link, @/components/ui/button, @/components/property/property-card, @/components/property/property-skeleton, lucide-react<br>functions/methods (5): L14 function HandpickedSelections({ limit = 4 }: HandpickedSelectionsProps); L18 callback (inline callback)(); L19 callback async fetchProperties(); L48 callback (inline callback)(_, i); L53 callback (inline callback)(property) |
| `components/sections/hero.tsx` | TSX / React · 4,020 bytes · 80 lines | Reusable UI component or feature-specific presentation module<br>exports: default function Hero<br>imports: @/components/ui/button, lucide-react<br>functions/methods (1): L4 function Hero() |
| `components/sections/how-it-works.tsx` | TSX / React · 1,474 bytes · 35 lines | Reusable UI component or feature-specific presentation module<br>exports: default function HowItWorks<br>functions/methods (2): L8 function HowItWorks(); L18 callback (inline callback)(step, idx) |
| `components/sections/investment-opportunities.tsx` | TSX / React · 6,041 bytes · 148 lines | Reusable UI component or feature-specific presentation module<br>exports: default function InvestmentOpportunities<br>imports: next/link, @/components/ui/button, lucide-react<br>functions/methods (3): L66 function InvestmentOpportunities(); L81 callback (inline callback)(opportunity, index); L122 callback (inline callback)(feature) |
| `components/sections/land-types-browse.tsx` | TSX / React · 6,064 bytes · 150 lines | Reusable UI component or feature-specific presentation module<br>exports: default function LandTypesBrowse<br>imports: next/image, next/link, lucide-react<br>functions/methods (3): L73 function LandTypesBrowse(); L95 callback (inline callback)(type, index); L132 callback (inline callback)([label, href]) |
| `components/sections/list-your-land.tsx` | TSX / React · 4,209 bytes · 102 lines | Reusable UI component or feature-specific presentation module<br>exports: default function ListYourLandGuide<br>imports: next/link, @/components/ui/button, lucide-react, ./youtube-facade<br>functions/methods (2): L6 function ListYourLandGuide(); L59 callback (inline callback)(step, index) |
| `components/sections/luxury-showcase.tsx` | TSX / React · 6,462 bytes · 155 lines | Reusable UI component or feature-specific presentation module<br>exports: default function LuxuryShowcase<br>imports: next/link, @/components/ui/button, lucide-react<br>functions/methods (2): L39 function LuxuryShowcase(); L99 callback (inline callback)(property) |
| `components/sections/new-properties.tsx` | TSX / React · 9,596 bytes · 189 lines | Reusable UI component or feature-specific presentation module<br>exports: default function NewProperties<br>imports: react, next/link, @/components/ui/button, lucide-react, @/lib/utils<br>functions/methods (17): L9 function NewProperties(); L17 callback scrollListings(direction: "next" \| "previous"); L34 callback (inline callback)(); L35 callback async fetchProperties(); L41 callback (inline callback)(property: any); L51 callback (inline callback)(); L53 callback (inline callback)(); L54 callback (inline callback)(); L66 callback (inline callback)(_, i); L92 callback (inline callback)(); L100 callback (inline callback)(); L114 callback (inline callback)(); L115 callback (inline callback)(); L116 callback (inline callback)(); L117 callback (inline callback)(); L121 callback (inline callback)(property); L130 callback (inline callback)(e) |
| `components/sections/popular-locations.tsx` | TSX / React · 2,542 bytes · 55 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PopularLocations<br>imports: next/link, lucide-react<br>functions/methods (2): L19 function PopularLocations(); L34 callback (inline callback)(loc) |
| `components/sections/popular-regions.tsx` | TSX / React · 6,533 bytes · 151 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PopularRegions<br>imports: next/image, next/link, @/components/ui/button, lucide-react<br>functions/methods (3): L66 function PopularRegions(); L86 callback (inline callback)(region); L119 callback (inline callback)(city) |
| `components/sections/popular-states.tsx` | TSX / React · 3,456 bytes · 94 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PopularStates<br>imports: next/link, @/components/ui/button, lucide-react<br>functions/methods (2): L43 function PopularStates(); L61 callback (inline callback)(state) |
| `components/sections/promo-banners.tsx` | TSX / React · 6,937 bytes · 186 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PromoBanners<br>imports: react, next/link, lucide-react, @/lib/utils<br>functions/methods (13): L44 function PromoBanners(); L48 callback (inline callback)(); L51 callback (inline callback)(); L52 callback (inline callback)(prev); L55 callback (inline callback)(); L63 callback (inline callback)(banner, index); L74 callback (inline callback)(); L75 callback (inline callback)(); L118 callback (inline callback)(); L119 callback (inline callback)(); L121 callback (inline callback)(banner, index); L171 callback (inline callback)(_, index); L174 callback (inline callback)() |
| `components/sections/property-types.tsx` | TSX / React · 2,911 bytes · 83 lines | Reusable UI component or feature-specific presentation module<br>exports: default function PropertyTypes<br>imports: next/link, lucide-react<br>functions/methods (2): L39 function PropertyTypes(); L51 callback (inline callback)(type) |
| `components/sections/recently-viewed.tsx` | TSX / React · 3,703 bytes · 94 lines | Reusable UI component or feature-specific presentation module<br>exports: default function RecentlyViewed<br>imports: @/hooks/use-recently-viewed, lucide-react, next/link, next/image, @/components/ui/button<br>functions/methods (2): L9 function RecentlyViewed(); L42 callback (inline callback)(item) |
| `components/sections/recommended-properties.tsx` | TSX / React · 7,483 bytes · 172 lines | Reusable UI component or feature-specific presentation module<br>exports: default function RecommendedProperties<br>imports: react, next/link, lucide-react, @/lib/utils<br>functions/methods (5): L21 function RecommendedProperties(); L25 callback (inline callback)(); L26 callback async fetchProperties(); L65 callback (inline callback)(property); L75 callback (inline callback)(e) |
| `components/sections/recommended-property.tsx` | TSX / React · 8,518 bytes · 172 lines | Reusable UI component or feature-specific presentation module<br>exports: default function RecommendedProperty<br>imports: react, next/link, lucide-react, @/lib/utils<br>functions/methods (5): L27 function RecommendedProperty(); L31 callback (inline callback)(); L32 callback async fetchProperties(); L56 callback (inline callback)(_, i); L80 callback (inline callback)(property, index) |
| `components/sections/search-map-promo.tsx` | TSX / React · 8,463 bytes · 131 lines | Reusable UI component or feature-specific presentation module<br>exports: default function SearchMapPromo<br>imports: next/link, @/components/ui/button, lucide-react<br>functions/methods (1): L5 function SearchMapPromo() |
| `components/sections/seller-roadblocks.tsx` | TSX / React · 2,004 bytes · 25 lines | Reusable UI component or feature-specific presentation module<br>exports: default function SellerRoadblocks<br>imports: next/link, lucide-react, @/components/ui/button<br>functions/methods (1): L5 function SellerRoadblocks() |
| `components/sections/services.tsx` | TSX / React · 2,244 bytes · 67 lines | Reusable UI component or feature-specific presentation module<br>exports: default function Services<br>imports: @/components/ui/card<br>functions/methods (2): L36 function Services(); L48 callback (inline callback)(service, index) |
| `components/sections/state-documents.tsx` | TSX / React · 12,146 bytes · 250 lines | Reusable UI component or feature-specific presentation module<br>exports: default function StateDocuments<br>imports: react, next/link, lucide-react<br>functions/methods (6): L110 function StateDocuments(); L112 callback (inline callback)(s); L138 callback (inline callback)(s); L145 callback (inline callback)(); L182 callback (inline callback)(doc, i); L218 callback (inline callback)(doc) |
| `components/sections/state-portal-finder.tsx` | TSX / React · 7,011 bytes · 147 lines | Reusable UI component or feature-specific presentation module<br>exports: default function StatePortalFinder<br>imports: react, lucide-react<br>functions/methods (7): L65 function StatePortalFinder(); L69 callback (inline callback)(); L69 callback (inline callback)(state); L93 callback (inline callback)(event); L96 callback (inline callback)(state); L104 callback (inline callback)(event); L107 callback (inline callback)(task) |
| `components/sections/stats-bar.tsx` | TSX / React · 1,798 bytes · 63 lines | Reusable UI component or feature-specific presentation module<br>exports: default function StatsBar<br>imports: lucide-react<br>functions/methods (2): L30 function StatsBar(); L35 callback (inline callback)(stat) |
| `components/sections/testimonials.tsx` | TSX / React · 6,675 bytes · 162 lines | Reusable UI component or feature-specific presentation module<br>exports: default function Testimonials<br>imports: react, lucide-react, @/components/ui/button<br>functions/methods (10): L42 function Testimonials(); L45 callback nextTestimonial(); L46 callback (inline callback)(prev); L49 callback prevTestimonial(); L50 callback (inline callback)(prev); L80 callback (inline callback)(_, i); L127 callback (inline callback)(_, index); L130 callback (inline callback)(); L146 callback (inline callback)(t, index); L149 callback (inline callback)() |
| `components/sections/trending-land-properties.tsx` | TSX / React · 7,054 bytes · 154 lines | Reusable UI component or feature-specific presentation module<br>exports: default function TrendingLandProperties<br>imports: react, next/link, @/components/ui/button, lucide-react, @/lib/utils<br>functions/methods (6): L9 function TrendingLandProperties(); L13 callback (inline callback)(); L14 callback async fetchProperties(); L36 callback (inline callback)(_, i); L62 callback (inline callback)(property); L72 callback (inline callback)(e) |
| `components/sections/trending-locations.tsx` | TSX / React · 3,719 bytes · 104 lines | Reusable UI component or feature-specific presentation module<br>exports: default function TrendingLocations<br>imports: next/link, next/image, lucide-react<br>functions/methods (2): L58 function TrendingLocations(); L71 callback (inline callback)(location) |
| `components/sections/trending-tabs-section.tsx` | TSX / React · 4,288 bytes · 107 lines | Reusable UI component or feature-specific presentation module<br>exports: default function TrendingTabsSection<br>imports: react, next/link, @/components/ui/button, @/components/ui/tabs, @/components/property/property-card, @/components/property/property-skeleton, lucide-react<br>functions/methods (8): L26 function TrendingTabsSection({ limit = 8 }: TrendingTabsSectionProps); L31 callback (inline callback)(); L32 callback async fetchProperties(); L36 callback async (inline callback)(tab); L66 callback (inline callback)(tab); L77 callback (inline callback)(tab); L82 callback (inline callback)(_, i); L87 callback (inline callback)(property) |
| `components/sections/unit-converter-promo.tsx` | TSX / React · 1,487 bytes · 25 lines | Reusable UI component or feature-specific presentation module<br>exports: default function UnitConverterPromo<br>imports: next/link, lucide-react, @/components/ui/button<br>functions/methods (1): L5 function UnitConverterPromo() |
| `components/sections/verified-properties.tsx` | TSX / React · 7,128 bytes · 153 lines | Reusable UI component or feature-specific presentation module<br>exports: default function VerifiedProperties<br>imports: react, next/link, @/components/ui/button, lucide-react, @/lib/utils<br>functions/methods (10): L9 function VerifiedProperties(); L14 callback (inline callback)(); L15 callback async fetchProperties(); L38 callback (inline callback)(_, i); L63 callback (inline callback)(); L63 callback (inline callback)(i); L71 callback (inline callback)(); L71 callback (inline callback)(i); L84 callback (inline callback)(property); L93 callback (inline callback)(e) |
| `components/sections/why-choose-us.tsx` | TSX / React · 4,084 bytes · 89 lines | Reusable UI component or feature-specific presentation module<br>exports: default function WhyChooseUs<br>imports: lucide-react<br>functions/methods (2): L36 function WhyChooseUs(); L62 callback (inline callback)(feature, index) |
| `components/sections/youtube-facade.tsx` | TSX / React · 1,757 bytes · 63 lines | Reusable UI component or feature-specific presentation module<br>exports: default function YouTubeFacade<br>imports: react, next/image, lucide-react<br>functions/methods (2): L15 function YouTubeFacade({ videoId, title, className, }: { videoId: string title: string className?: string }); L43 callback (inline callback)() |
| `components/seo/breadcrumb-json-ld.tsx` | TSX / React · 557 bytes · 26 lines | Reusable UI component or feature-specific presentation module<br>exports: default function BreadcrumbJsonLd<br>functions/methods (2): L6 function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }); L7 callback (inline callback)(item, index) |
| `components/services/service-enquiry-form.tsx` | TSX / React · 6,723 bytes · 193 lines | Reusable UI component or feature-specific presentation module<br>exports: default function ServiceEnquiryForm<br>imports: react, @/components/ui/button, @/components/ui/input, @/components/ui/textarea, @/components/ui/label, @/components/ui/select, lucide-react, sonner<br>functions/methods (8): L18 function ServiceEnquiryForm({ serviceName, serviceId, compact = false }: ServiceEnquiryFormProps); L30 callback async handleSubmit(e: React.FormEvent); L79 callback (inline callback)(); L98 callback (inline callback)(e); L113 callback (inline callback)(e); L131 callback (inline callback)(e); L142 callback (inline callback)(value); L166 callback (inline callback)(e) |
| `components/theme-provider.tsx` | TSX / React · 292 bytes · 11 lines | Reusable UI component or feature-specific presentation module<br>exports: function ThemeProvider<br>imports: react, next-themes<br>functions/methods (1): L9 function ThemeProvider({ children, ...props }: ThemeProviderProps) |
| `components/ui/accordion.tsx` | TSX / React · 2,054 bytes · 66 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-accordion, lucide-react, @/lib/utils<br>functions/methods (4): L9 function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>); L15 function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>); L28 function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>); L50 function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) |
| `components/ui/alert-dialog.tsx` | TSX / React · 3,867 bytes · 157 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-alert-dialog, @/lib/utils, @/components/ui/button<br>functions/methods (11): L9 function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>); L15 function AlertDialogTrigger({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>); L23 function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>); L31 function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>); L47 function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>); L66 function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>); L79 function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>); L95 function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>); L108 function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>); L121 function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action>); L133 function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) |
| `components/ui/alert.tsx` | TSX / React · 1,617 bytes · 66 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, class-variance-authority, @/lib/utils<br>functions/methods (3): L22 function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>); L37 function AlertTitle({ className, ...props }: React.ComponentProps<'div'>); L50 function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) |
| `components/ui/aspect-ratio.tsx` | TSX / React · 280 bytes · 11 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: @radix-ui/react-aspect-ratio<br>functions/methods (1): L5 function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) |
| `components/ui/avatar.tsx` | TSX / React · 1,099 bytes · 53 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-avatar, @/lib/utils<br>functions/methods (3): L8 function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>); L24 function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>); L37 function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) |
| `components/ui/badge.tsx` | TSX / React · 1,632 bytes · 46 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-slot, class-variance-authority, @/lib/utils<br>functions/methods (1): L28 function Badge({ className, variant, asChild = false, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) |
| `components/ui/breadcrumb.tsx` | TSX / React · 2,358 bytes · 109 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-slot, lucide-react, @/lib/utils<br>functions/methods (7): L7 function Breadcrumb({ ...props }: React.ComponentProps<'nav'>); L11 function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>); L24 function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>); L34 function BreadcrumbLink({ asChild, className, ...props }: React.ComponentProps<'a'> & { asChild?: boolean }); L52 function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>); L65 function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>); L83 function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) |
| `components/ui/button-group.tsx` | TSX / React · 2,212 bytes · 83 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: @radix-ui/react-slot, class-variance-authority, @/lib/utils, @/components/ui/separator<br>functions/methods (3): L24 function ButtonGroup({ className, orientation, ...props }: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>); L40 function ButtonGroupText({ className, asChild = false, ...props }: React.ComponentProps<'div'> & { asChild?: boolean }); L60 function ButtonGroupSeparator({ className, orientation = 'vertical', ...props }: React.ComponentProps<typeof Separator>) |
| `components/ui/button.tsx` | TSX / React · 2,143 bytes · 60 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-slot, class-variance-authority, @/lib/utils<br>functions/methods (1): L39 function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) |
| `components/ui/calendar.tsx` | TSX / React · 7,679 bytes · 213 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, lucide-react, react-day-picker, @/lib/utils, @/components/ui/button<br>functions/methods (7): L14 function Calendar({ className, classNames, showOutsideDays = true, captionLayout = 'label', buttonVariant = 'ghost', formatters, components, ...props }: React.ComponentProps<typeof DayPicker> & { buttonVariant?: React.ComponentProps<typeof Button>['variant'] }); L39 callback formatMonthDropdown(date); L128 callback Root({ className, rootRef, ...props }); L138 callback Chevron({ className, orientation, ...props }); L159 callback WeekNumber({ children, ...props }); L175 function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>); L184 callback (inline callback)() |
| `components/ui/card.tsx` | TSX / React · 1,990 bytes · 92 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @/lib/utils<br>functions/methods (7): L5 function Card({ className, ...props }: React.ComponentProps<'div'>); L18 function CardHeader({ className, ...props }: React.ComponentProps<'div'>); L31 function CardTitle({ className, ...props }: React.ComponentProps<'div'>); L41 function CardDescription({ className, ...props }: React.ComponentProps<'div'>); L51 function CardAction({ className, ...props }: React.ComponentProps<'div'>); L64 function CardContent({ className, ...props }: React.ComponentProps<'div'>); L74 function CardFooter({ className, ...props }: React.ComponentProps<'div'>) |
| `components/ui/carousel.tsx` | TSX / React · 5,562 bytes · 241 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, embla-carousel-react, lucide-react, @/lib/utils, @/components/ui/button<br>functions/methods (13): L35 function useCarousel(); L45 function Carousel({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }: React.ComponentProps<'div'> & CarouselProps); L64 callback (inline callback)(api: CarouselApi); L70 callback (inline callback)(); L74 callback (inline callback)(); L79 callback (inline callback)(event: React.KeyboardEvent<HTMLDivElement>); L91 callback (inline callback)(); L96 callback (inline callback)(); L102 callback (inline callback)(); L135 function CarouselContent({ className, ...props }: React.ComponentProps<'div'>); L156 function CarouselItem({ className, ...props }: React.ComponentProps<'div'>); L174 function CarouselPrevious({ className, variant = 'outline', size = 'icon', ...props }: React.ComponentProps<typeof Button>); L204 function CarouselNext({ className, variant = 'outline', size = 'icon', ...props }: React.ComponentProps<typeof Button>) |
| `components/ui/chart.tsx` | TSX / React · 9,786 bytes · 353 lines | Reusable UI component or feature-specific presentation module<br>exports: typealias ChartConfig, re-export<br>imports: react, recharts, @/lib/utils<br>functions/methods (12): L27 function useChart(); L37 function ChartContainer({ id, className, children, config, ...props }: React.ComponentProps<'div'> & { config: ChartConfig children: React.ComponentProps< typeof RechartsPrimitive.ResponsiveContainer >['children'] }); L72 callback ChartStyle({ id, config }: { id: string; config: ChartConfig }); L74 callback (inline callback)([, config]); L86 callback (inline callback)([theme, prefix]); L89 callback (inline callback)([key, itemConfig]); L107 function ChartTooltipContent({ active, payload, className, indicator = 'dot', hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, }: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & React.ComponentProps<'div'> & { hideLabel?: boolean hideIndicator?: boolean indicator?: 'line' \| 'dot' \| 'dashed' nameKey?: string labelKey?: string }); L131 callback (inline callback)(); L182 callback (inline callback)(item, index); L253 function ChartLegendContent({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey, }: React.ComponentProps<'div'> & Pick<RechartsPrimitive.LegendProps, 'payload' \| 'verticalAlign'> & { hideIcon?: boolean nameKey?: string }); L278 callback (inline callback)(item); L308 function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) |
| `components/ui/checkbox.tsx` | TSX / React · 1,227 bytes · 32 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-checkbox, lucide-react, @/lib/utils<br>functions/methods (1): L9 function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) |
| `components/ui/collapsible.tsx` | TSX / React · 800 bytes · 33 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: @radix-ui/react-collapsible<br>functions/methods (3): L5 function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>); L11 function CollapsibleTrigger({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>); L22 function CollapsibleContent({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) |
| `components/ui/combo-select.tsx` | TSX / React · 10,723 bytes · 351 lines | Reusable UI component or feature-specific presentation module<br>exports: function ComboSelect, function MultiComboSelect<br>imports: react, react, lucide-react, @/lib/utils<br>functions/methods (26): L29 function ComboSelect({ value, onChange, options, onAddNew, placeholder = "Select or add new...", label, multiple = false, loading = false, className, disabled = false, dropdownPosition = "auto", }: ComboSelectProps); L51 callback (inline callback)(); L68 callback (inline callback)(); L69 callback handleClickOutside(event: MouseEvent); L76 callback (inline callback)(); L80 callback (inline callback)(); L82 callback (inline callback)(); L83 callback (inline callback)(); L87 callback (inline callback)(opt); L91 callback isValueSelected(optionName: string); L98 callback handleSelect(optionName: string); L101 callback (inline callback)(v); L112 callback async handleAddNew(); L116 callback (inline callback)(opt); L139 callback handleKeyDown(e: React.KeyboardEvent); L143 callback (inline callback)(opt); L157 callback removeTag(tagName: string, e: React.MouseEvent); L160 callback (inline callback)(v); L166 callback (inline callback)(opt); L180 callback (inline callback)(tag); L188 callback (inline callback)(e); L200 callback (inline callback)(); L212 callback (inline callback)(e); L251 callback (inline callback)(option); L254 callback (inline callback)(); L324 function MultiComboSelect({ value = [], onChange, options, onAddNew, placeholder = "Select or add items...", label, loading = false, className, disabled = false, dropdownPosition = "auto", }: MultiComboSelectProps) |
| `components/ui/command.tsx` | TSX / React · 4,824 bytes · 184 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, cmdk, lucide-react, @/lib/utils, @/components/ui/dialog<br>functions/methods (9): L16 function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>); L32 function CommandDialog({ title = 'Command Palette', description = 'Search for a command to run...', children, className, showCloseButton = true, ...props }: React.ComponentProps<typeof Dialog> & { title?: string description?: string className?: string showCloseButton?: boolean }); L63 function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>); L85 function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>); L101 function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>); L113 function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>); L129 function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>); L142 function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>); L158 function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) |
| `components/ui/context-menu.tsx` | TSX / React · 8,282 bytes · 252 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-context-menu, lucide-react, @/lib/utils<br>functions/methods (15): L9 function ContextMenu({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Root>); L15 function ContextMenuTrigger({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>); L23 function ContextMenuGroup({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Group>); L31 function ContextMenuPortal({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Portal>); L39 function ContextMenuSub({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Sub>); L45 function ContextMenuRadioGroup({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>); L56 function ContextMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }); L80 function ContextMenuSubContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>); L96 function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>); L114 function ContextMenuItem({ className, inset, variant = 'default', ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Item> & { inset?: boolean variant?: 'default' \| 'destructive' }); L137 function ContextMenuCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>); L163 function ContextMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>); L187 function ContextMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Label> & { inset?: boolean }); L207 function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>); L220 function ContextMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) |
| `components/ui/dialog.tsx` | TSX / React · 3,985 bytes · 143 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-dialog, lucide-react, @/lib/utils<br>functions/methods (10): L9 function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>); L15 function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>); L21 function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>); L27 function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>); L33 function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>); L49 function DialogContent({ className, children, showCloseButton = true, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { showCloseButton?: boolean }); L83 function DialogHeader({ className, ...props }: React.ComponentProps<'div'>); L93 function DialogFooter({ className, ...props }: React.ComponentProps<'div'>); L106 function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>); L119 function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) |
| `components/ui/drawer.tsx` | TSX / React · 4,258 bytes · 135 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, vaul, @/lib/utils<br>functions/methods (10): L8 function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>); L14 function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>); L20 function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>); L26 function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>); L32 function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>); L48 function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>); L75 function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>); L88 function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>); L98 function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>); L111 function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) |
| `components/ui/dropdown-menu.tsx` | TSX / React · 8,432 bytes · 257 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-dropdown-menu, lucide-react, @/lib/utils<br>functions/methods (15): L9 function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>); L15 function DropdownMenuPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>); L23 function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>); L34 function DropdownMenuContent({ className, sideOffset = 4, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>); L54 function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>); L62 function DropdownMenuItem({ className, inset, variant = 'default', ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & { inset?: boolean variant?: 'default' \| 'destructive' }); L85 function DropdownMenuCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>); L111 function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>); L122 function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>); L146 function DropdownMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }); L166 function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>); L179 function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>); L195 function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>); L201 function DropdownMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }); L225 function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) |
| `components/ui/empty.tsx` | TSX / React · 2,401 bytes · 104 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: class-variance-authority, @/lib/utils<br>functions/methods (6): L5 function Empty({ className, ...props }: React.ComponentProps<'div'>); L18 function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>); L46 function EmptyMedia({ className, variant = 'default', ...props }: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>); L61 function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>); L71 function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>); L84 function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) |
| `components/ui/field.tsx` | TSX / React · 6,055 bytes · 244 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, class-variance-authority, @/lib/utils, @/components/ui/label, @/components/ui/separator<br>functions/methods (12): L10 function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>); L24 function FieldLegend({ className, variant = 'legend', ...props }: React.ComponentProps<'legend'> & { variant?: 'legend' \| 'label' }); L44 function FieldGroup({ className, ...props }: React.ComponentProps<'div'>); L81 function Field({ className, orientation = 'vertical', ...props }: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>); L97 function FieldContent({ className, ...props }: React.ComponentProps<'div'>); L110 function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>); L128 function FieldTitle({ className, ...props }: React.ComponentProps<'div'>); L141 function FieldDescription({ className, ...props }: React.ComponentProps<'p'>); L156 function FieldSeparator({ children, className, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode }); L186 function FieldError({ className, children, errors, ...props }: React.ComponentProps<'div'> & { errors?: Array<{ message?: string } \| undefined> }); L194 callback (inline callback)(); L210 callback (inline callback)(error, index) |
| `components/ui/form.tsx` | TSX / React · 3,761 bytes · 167 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-label, @radix-ui/react-slot, react-hook-form, @/lib/utils, @/components/ui/label<br>functions/methods (7): L32 callback FormField({ ...props }: ControllerProps<TFieldValues, TName>); L45 callback useFormField(); L76 function FormItem({ className, ...props }: React.ComponentProps<'div'>); L90 function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>); L107 function FormControl({ ...props }: React.ComponentProps<typeof Slot>); L125 function FormDescription({ className, ...props }: React.ComponentProps<'p'>); L138 function FormMessage({ className, ...props }: React.ComponentProps<'p'>) |
| `components/ui/hover-card.tsx` | TSX / React · 1,533 bytes · 44 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-hover-card, @/lib/utils<br>functions/methods (3): L8 function HoverCard({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>); L14 function HoverCardTrigger({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>); L22 function HoverCardContent({ className, align = 'center', sideOffset = 4, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Content>) |
| `components/ui/input-group.tsx` | TSX / React · 5,031 bytes · 169 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: class-variance-authority, @/lib/utils, @/components/ui/button, @/components/ui/input, @/components/ui/textarea<br>functions/methods (7): L10 function InputGroup({ className, ...props }: React.ComponentProps<'div'>); L59 function InputGroupAddon({ className, align = 'inline-start', ...props }: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>); L70 callback (inline callback)(e); L99 function InputGroupButton({ className, type = 'button', variant = 'ghost', size = 'xs', ...props }: Omit<React.ComponentProps<typeof Button>, 'size'> & VariantProps<typeof inputGroupButtonVariants>); L118 function InputGroupText({ className, ...props }: React.ComponentProps<'span'>); L130 function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>); L146 function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) |
| `components/ui/input-otp.tsx` | TSX / React · 2,256 bytes · 77 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, input-otp, lucide-react, @/lib/utils<br>functions/methods (4): L9 function InputOTP({ className, containerClassName, ...props }: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }); L29 function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>); L39 function InputOTPSlot({ index, className, ...props }: React.ComponentProps<'div'> & { index: number }); L69 function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) |
| `components/ui/input.tsx` | TSX / React · 963 bytes · 21 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @/lib/utils<br>functions/methods (1): L5 function Input({ className, type, ...props }: React.ComponentProps<'input'>) |
| `components/ui/item.tsx` | TSX / React · 4,503 bytes · 193 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-slot, class-variance-authority, @/lib/utils, @/components/ui/separator<br>functions/methods (10): L8 function ItemGroup({ className, ...props }: React.ComponentProps<'div'>); L19 function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>); L54 function Item({ className, variant = 'default', size = 'default', asChild = false, ...props }: React.ComponentProps<'div'> & VariantProps<typeof itemVariants> & { asChild?: boolean }); L91 function ItemMedia({ className, variant = 'default', ...props }: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>); L106 function ItemContent({ className, ...props }: React.ComponentProps<'div'>); L119 function ItemTitle({ className, ...props }: React.ComponentProps<'div'>); L132 function ItemDescription({ className, ...props }: React.ComponentProps<'p'>); L146 function ItemActions({ className, ...props }: React.ComponentProps<'div'>); L156 function ItemHeader({ className, ...props }: React.ComponentProps<'div'>); L169 function ItemFooter({ className, ...props }: React.ComponentProps<'div'>) |
| `components/ui/kbd.tsx` | TSX / React · 863 bytes · 28 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: @/lib/utils<br>functions/methods (2): L3 function Kbd({ className, ...props }: React.ComponentProps<'kbd'>); L18 function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) |
| `components/ui/label.tsx` | TSX / React · 612 bytes · 24 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-label, @/lib/utils<br>functions/methods (1): L8 function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) |
| `components/ui/menubar.tsx` | TSX / React · 8,404 bytes · 276 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-menubar, lucide-react, @/lib/utils<br>functions/methods (16): L9 function Menubar({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>); L25 function MenubarMenu({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>); L31 function MenubarGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>); L37 function MenubarPortal({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>); L43 function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>); L51 function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>); L67 function MenubarContent({ className, align = 'start', alignOffset = -4, sideOffset = 8, ...props }: React.ComponentProps<typeof MenubarPrimitive.Content>); L91 function MenubarItem({ className, inset, variant = 'default', ...props }: React.ComponentProps<typeof MenubarPrimitive.Item> & { inset?: boolean variant?: 'default' \| 'destructive' }); L114 function MenubarCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>); L140 function MenubarRadioItem({ className, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>); L164 function MenubarLabel({ className, inset, ...props }: React.ComponentProps<typeof MenubarPrimitive.Label> & { inset?: boolean }); L184 function MenubarSeparator({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>); L197 function MenubarShortcut({ className, ...props }: React.ComponentProps<'span'>); L213 function MenubarSub({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>); L219 function MenubarSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }); L243 function MenubarSubContent({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubContent>) |
| `components/ui/navigation-menu.tsx` | TSX / React · 6,651 bytes · 166 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-navigation-menu, class-variance-authority, lucide-react, @/lib/utils<br>functions/methods (8): L8 function NavigationMenu({ className, children, viewport = true, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & { viewport?: boolean }); L32 function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>); L48 function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>); L65 function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>); L85 function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>); L102 function NavigationMenuViewport({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>); L122 function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>); L138 function NavigationMenuIndicator({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) |
| `components/ui/pagination.tsx` | TSX / React · 2,713 bytes · 127 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, lucide-react, @/lib/utils, @/components/ui/button<br>functions/methods (7): L11 function Pagination({ className, ...props }: React.ComponentProps<'nav'>); L23 function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>); L36 function PaginationItem({ ...props }: React.ComponentProps<'li'>); L45 function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps); L68 function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>); L85 function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>); L102 function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) |
| `components/ui/popover.tsx` | TSX / React · 1,636 bytes · 48 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-popover, @/lib/utils<br>functions/methods (4): L8 function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>); L14 function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>); L20 function PopoverContent({ className, align = 'center', sideOffset = 4, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content>); L42 function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) |
| `components/ui/popup-confirm.tsx` | TSX / React · 1,602 bytes · 48 lines | Reusable UI component or feature-specific presentation module<br>exports: function PopupConfirm, function PopupConfirmRoot<br>imports: react<br>functions/methods (6): L4 function PopupConfirm({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }); L21 function PopupConfirmRoot(); L26 callback (inline callback)(msg: string); L29 callback (inline callback)(resolve); L35 callback handleConfirm(); L40 callback handleCancel() |
| `components/ui/progress.tsx` | TSX / React · 741 bytes · 31 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-progress, @/lib/utils<br>functions/methods (1): L8 function Progress({ className, value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) |
| `components/ui/radio-group.tsx` | TSX / React · 1,467 bytes · 45 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-radio-group, lucide-react, @/lib/utils<br>functions/methods (2): L9 function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>); L22 function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) |
| `components/ui/resizable.tsx` | TSX / React · 2,030 bytes · 56 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, lucide-react, react-resizable-panels, @/lib/utils<br>functions/methods (3): L9 function ResizablePanelGroup({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>); L25 function ResizablePanel({ ...props }: React.ComponentProps<typeof ResizablePrimitive.Panel>); L31 function ResizableHandle({ withHandle, className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & { withHandle?: boolean }) |
| `components/ui/scroll-area.tsx` | TSX / React · 1,646 bytes · 58 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-scroll-area, @/lib/utils<br>functions/methods (2): L8 function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>); L31 function ScrollBar({ className, orientation = 'vertical', ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) |
| `components/ui/select.tsx` | TSX / React · 6,259 bytes · 185 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-select, lucide-react, @/lib/utils<br>functions/methods (10): L9 function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>); L15 function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>); L21 function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>); L27 function SelectTrigger({ className, size = 'default', children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger> & { size?: 'sm' \| 'default' }); L53 function SelectContent({ className, children, position = 'popper', ...props }: React.ComponentProps<typeof SelectPrimitive.Content>); L88 function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>); L101 function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>); L125 function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>); L138 function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>); L156 function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) |
| `components/ui/separator.tsx` | TSX / React · 700 bytes · 28 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-separator, @/lib/utils<br>functions/methods (1): L8 function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root>) |
| `components/ui/sheet.tsx` | TSX / React · 4,092 bytes · 139 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-dialog, lucide-react, @/lib/utils<br>functions/methods (10): L9 function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>); L13 function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>); L19 function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>); L25 function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>); L31 function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>); L47 function SheetContent({ className, children, side = 'right', ...props }: React.ComponentProps<typeof SheetPrimitive.Content> & { side?: 'top' \| 'right' \| 'bottom' \| 'left' }); L84 function SheetHeader({ className, ...props }: React.ComponentProps<'div'>); L94 function SheetFooter({ className, ...props }: React.ComponentProps<'div'>); L104 function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>); L117 function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) |
| `components/ui/sidebar.tsx` | TSX / React · 21,649 bytes · 726 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-slot, class-variance-authority, lucide-react, @/hooks/use-mobile, @/lib/utils, @/components/ui/button, @/components/ui/input, @/components/ui/separator, @/components/ui/sheet, @/components/ui/skeleton, @/components/ui/tooltip<br>functions/methods (34): L47 function useSidebar(); L56 function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }: React.ComponentProps<'div'> & { defaultOpen?: boolean open?: boolean onOpenChange?: (open: boolean) => void }); L77 callback (inline callback)(value: boolean \| ((value: boolean) => boolean)); L92 callback (inline callback)(); L93 callback (inline callback)(open); L93 callback (inline callback)(open); L97 callback (inline callback)(); L98 callback handleKeyDown(event: KeyboardEvent); L109 callback (inline callback)(); L117 callback (inline callback)(); L154 function Sidebar({ side = 'left', variant = 'sidebar', collapsible = 'offcanvas', className, children, ...props }: React.ComponentProps<'div'> & { side?: 'left' \| 'right' variant?: 'sidebar' \| 'floating' \| 'inset' collapsible?: 'offcanvas' \| 'icon' \| 'none' }); L256 function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>); L270 callback (inline callback)(event); L282 function SidebarRail({ className, ...props }: React.ComponentProps<'button'>); L307 function SidebarInset({ className, ...props }: React.ComponentProps<'main'>); L321 function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>); L335 function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>); L346 function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>); L357 function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>); L371 function SidebarContent({ className, ...props }: React.ComponentProps<'div'>); L385 function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>); L396 function SidebarGroupLabel({ className, asChild = false, ...props }: React.ComponentProps<'div'> & { asChild?: boolean }); L417 function SidebarGroupAction({ className, asChild = false, ...props }: React.ComponentProps<'button'> & { asChild?: boolean }); L440 function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>); L454 function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>); L465 function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>); L498 function SidebarMenuButton({ asChild = false, isActive = false, variant = 'default', size = 'default', tooltip, className, ...props }: React.ComponentProps<'button'> & { asChild?: boolean isActive?: boolean tooltip?: string \| React.ComponentProps<typeof TooltipContent> } & VariantProps<typeof sidebarMenuButtonVariants>); L548 function SidebarMenuAction({ className, asChild = false, showOnHover = false, ...props }: React.ComponentProps<'button'> & { asChild?: boolean showOnHover?: boolean }); L580 function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>); L602 function SidebarMenuSkeleton({ className, showIcon = false, ...props }: React.ComponentProps<'div'> & { showIcon?: boolean }); L610 callback (inline callback)(); L640 function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>); L655 function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>); L669 function SidebarMenuSubButton({ asChild = false, size = 'md', isActive = false, className, ...props }: React.ComponentProps<'a'> & { asChild?: boolean size?: 'sm' \| 'md' isActive?: boolean }) |
| `components/ui/skeleton.tsx` | TSX / React · 276 bytes · 13 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: @/lib/utils<br>functions/methods (1): L3 function Skeleton({ className, ...props }: React.ComponentProps<'div'>) |
| `components/ui/slider.tsx` | TSX / React · 1,990 bytes · 63 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-slider, @/lib/utils<br>functions/methods (3): L8 function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>); L17 callback (inline callback)(); L52 callback (inline callback)(_, index) |
| `components/ui/sonner.tsx` | TSX / React · 564 bytes · 25 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: next-themes, sonner<br>functions/methods (1): L6 callback Toaster({ ...props }: ToasterProps) |
| `components/ui/spinner.tsx` | TSX / React · 331 bytes · 16 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: lucide-react, @/lib/utils<br>functions/methods (1): L5 function Spinner({ className, ...props }: React.ComponentProps<'svg'>) |
| `components/ui/switch.tsx` | TSX / React · 1,174 bytes · 31 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-switch, @/lib/utils<br>functions/methods (1): L8 function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) |
| `components/ui/table.tsx` | TSX / React · 2,452 bytes · 116 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @/lib/utils<br>functions/methods (8): L7 function Table({ className, ...props }: React.ComponentProps<'table'>); L22 function TableHeader({ className, ...props }: React.ComponentProps<'thead'>); L32 function TableBody({ className, ...props }: React.ComponentProps<'tbody'>); L42 function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>); L55 function TableRow({ className, ...props }: React.ComponentProps<'tr'>); L68 function TableHead({ className, ...props }: React.ComponentProps<'th'>); L81 function TableCell({ className, ...props }: React.ComponentProps<'td'>); L94 function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) |
| `components/ui/tabs.tsx` | TSX / React · 1,971 bytes · 66 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-tabs, @/lib/utils<br>functions/methods (4): L8 function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>); L21 function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>); L37 function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>); L53 function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) |
| `components/ui/textarea.tsx` | TSX / React · 760 bytes · 18 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @/lib/utils<br>functions/methods (1): L5 function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) |
| `components/ui/toast-provider.tsx` | TSX / React · 216 bytes · 8 lines | Reusable UI component or feature-specific presentation module<br>exports: function ToastProvider<br>imports: react-toastify, react-toastify/dist/ReactToastify.css<br>functions/methods (1): L6 function ToastProvider() |
| `components/ui/toast.tsx` | TSX / React · 4,863 bytes · 129 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-toast, class-variance-authority, lucide-react, @/lib/utils<br>functions/methods (6): L15 callback (inline callback)({ className, ...props }, ref); L47 callback (inline callback)({ className, variant, ...props }, ref); L61 callback (inline callback)({ className, ...props }, ref); L76 callback (inline callback)({ className, ...props }, ref); L94 callback (inline callback)({ className, ...props }, ref); L106 callback (inline callback)({ className, ...props }, ref) |
| `components/ui/toaster.tsx` | TSX / React · 786 bytes · 35 lines | Reusable UI component or feature-specific presentation module<br>exports: function Toaster<br>imports: @/hooks/use-toast, @/components/ui/toast<br>functions/methods (2): L13 function Toaster(); L18 callback (inline callback)({ id, title, description, action, ...props }) |
| `components/ui/toggle-group.tsx` | TSX / React · 1,927 bytes · 73 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-toggle-group, class-variance-authority, @/lib/utils, @/components/ui/toggle<br>functions/methods (2): L17 function ToggleGroup({ className, variant, size, children, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>); L43 function ToggleGroupItem({ className, children, variant, size, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) |
| `components/ui/toggle.tsx` | TSX / React · 1,571 bytes · 47 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-toggle, class-variance-authority, @/lib/utils<br>functions/methods (1): L31 function Toggle({ className, variant, size, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) |
| `components/ui/tooltip.tsx` | TSX / React · 1,893 bytes · 61 lines | Reusable UI component or feature-specific presentation module<br>exports: re-export<br>imports: react, @radix-ui/react-tooltip, @/lib/utils<br>functions/methods (4): L8 function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>); L21 function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>); L31 function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>); L37 function TooltipContent({ className, sideOffset = 0, children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>) |
| `components/ui/use-mobile.tsx` | TSX / React · 565 bytes · 19 lines | Reusable UI component or feature-specific presentation module<br>exports: function useIsMobile<br>imports: react<br>functions/methods (4): L5 function useIsMobile(); L8 callback (inline callback)(); L10 callback onChange(); L15 callback (inline callback)() |
| `components/ui/use-toast.ts` | TypeScript · 3,945 bytes · 191 lines | Reusable UI component or feature-specific presentation module<br>exports: const reducer, re-export<br>imports: react, @/components/ui/toast<br>functions/methods (18): L27 function genId(); L58 callback addToRemoveQueue(toastId: string); L63 callback (inline callback)(); L74 callback reducer(state: State, action: Action): State; L85 callback (inline callback)(t); L98 callback (inline callback)(toast); L105 callback (inline callback)(t); L124 callback (inline callback)(t); L133 function dispatch(action: Action); L135 callback (inline callback)(listener); L142 function toast({ ...props }: Toast); L145 callback update(props: ToasterToast); L150 callback dismiss(); L158 callback onOpenChange(open); L171 function useToast(); L174 callback (inline callback)(); L176 callback (inline callback)(); L187 callback dismiss(toastId?: string) |
| `components/ui/user-avatar.tsx` | TSX / React · 1,564 bytes · 52 lines | Reusable UI component or feature-specific presentation module<br>exports: function UserAvatar, default export<br>imports: react, @/lib/utils<br>functions/methods (4): L15 function getInitials(name?: string \| null); L18 callback (inline callback)(p); L26 function UserAvatar({ name, src, className, textClassName, alt }: UserAvatarProps); L43 callback (inline callback)() |
| `components/ui/whatsapp-button.tsx` | TSX / React · 9,999 bytes · 231 lines | Reusable UI component or feature-specific presentation module<br>exports: const WHATSAPP_NUMBER, default function WhatsAppButton, function PropertyWhatsAppLink, function PropertyWhatsAppMobileBar<br>imports: react, lucide-react, @/lib/utils<br>functions/methods (15): L10 function WhatsAppButton(); L14 callback (inline callback)(); L17 callback showButton(); L21 callback (inline callback)(); L24 callback (inline callback)(); L29 callback (inline callback)(); L31 callback (inline callback)(); L32 callback (inline callback)(); L33 callback (inline callback)(); L56 callback (inline callback)(e); L102 function PropertyWhatsAppLink({ propertyName, price, propertyUrl, withLabel = false, variant = "circle", className, }: PropertyWhatsAppLinkProps); L120 callback WhatsAppIcon(); L137 callback (inline callback)(e); L158 callback (inline callback)(e); L184 function PropertyWhatsAppMobileBar({ propertyName, price, phone, }: { propertyName: string price?: string phone?: string }) |
| `cr.md` | Markdown documentation · 3 bytes | Project documentation |
| `data/golf-course-road-properties.json` | JSON data/config · 29,195 bytes | Static or typed application data |
| `data/location-content.ts` | TypeScript · 73,625 bytes · 1057 lines | Static or typed application data<br>exports: interface LocationStat, interface FilterOption, interface PropertyListing, interface FeaturedProject, interface WhyPremiumCard, interface PriceTrend, interface SummaryStatBox, interface ConnectivityCard, interface NearbyInfrastructure, interface FAQ, interface SectorBreakdown, interface ComparisonRow, interface LocationContent, const locationContentMap, function getLocationContent, re-export<br>functions/methods (1): L1046 function getLocationContent(slug: string): LocationContent \| null |
| `google2a84e53130347dd4.html` | HTML document · 53 bytes | Project configuration, source, or static asset |
| `hooks/use-geolocation.ts` | TypeScript · 8,017 bytes · 269 lines | Reusable React hook<br>exports: interface GeoLocation, interface UseGeolocationReturn, function calculateDistance, function formatDistance, function useGeolocation<br>imports: react<br>functions/methods (13): L35 function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number; L51 function toRad(deg: number): number; L56 function formatDistance(km: number): string; L66 function useGeolocation(): UseGeolocationReturn; L73 callback async (inline callback)(): Promise<PermissionState \| null>; L80 callback (inline callback)(); L90 callback (inline callback)(): Promise<GeoLocation>; L91 callback (inline callback)(resolve, reject); L98 callback async (inline callback)(position); L123 callback (inline callback)(err); L148 callback async (inline callback)(): Promise<GeoLocation>; L203 callback async (inline callback)(): Promise<GeoLocation \| null>; L256 callback (inline callback)() |
| `hooks/use-mobile.ts` | TypeScript · 565 bytes · 19 lines | Reusable React hook<br>exports: function useIsMobile<br>imports: react<br>functions/methods (4): L5 function useIsMobile(); L8 callback (inline callback)(); L10 callback onChange(); L15 callback (inline callback)() |
| `hooks/use-mobile.tsx` | TSX / React · 565 bytes · 19 lines | Reusable React hook<br>exports: function useIsMobile<br>imports: react<br>functions/methods (4): L5 function useIsMobile(); L8 callback (inline callback)(); L10 callback onChange(); L15 callback (inline callback)() |
| `hooks/use-recently-viewed.ts` | TypeScript · 1,647 bytes · 70 lines | Reusable React hook<br>exports: interface RecentlyViewedProperty, function useRecentlyViewed<br>imports: react<br>functions/methods (6): L19 function useRecentlyViewed(); L24 callback (inline callback)(); L38 callback (inline callback)(property: RecentlyViewedProperty); L39 callback (inline callback)(prev); L41 callback (inline callback)(item); L54 callback (inline callback)() |
| `hooks/use-toast.ts` | TypeScript · 3,945 bytes · 191 lines | Reusable React hook<br>exports: const reducer, re-export<br>imports: react, @/components/ui/toast<br>functions/methods (18): L27 function genId(); L58 callback addToRemoveQueue(toastId: string); L63 callback (inline callback)(); L74 callback reducer(state: State, action: Action): State; L85 callback (inline callback)(t); L98 callback (inline callback)(toast); L105 callback (inline callback)(t); L124 callback (inline callback)(t); L133 function dispatch(action: Action); L135 callback (inline callback)(listener); L142 function toast({ ...props }: Toast); L145 callback update(props: ToasterToast); L150 callback dismiss(); L158 callback onOpenChange(open); L171 function useToast(); L174 callback (inline callback)(); L176 callback (inline callback)(); L187 callback dismiss(toastId?: string) |
| `hooks/use-voice-search.ts` | TypeScript · 5,691 bytes · 202 lines | Reusable React hook<br>exports: function useVoiceSearch<br>imports: react<br>functions/methods (10): L74 function useVoiceSearch(options: UseVoiceSearchOptions = {}): UseVoiceSearchReturn; L84 callback (inline callback)(); L92 callback (inline callback)(); L118 callback (inline callback)(); L124 callback (inline callback)(event: SpeechRecognitionEvent); L140 callback (inline callback)(event: SpeechRecognitionErrorEvent); L164 callback (inline callback)(); L177 callback (inline callback)(); L184 callback (inline callback)(); L185 callback (inline callback)() |
| `hooks/useValidateLink.ts` | TypeScript · 2,322 bytes · 76 lines | Reusable React hook<br>exports: function useValidateLink, function useValidateLinks<br>imports: react, @/lib/link-validator<br>functions/methods (11): L17 function useValidateLink(href: string): LinkValidationResult; L20 callback (inline callback)(); L43 function useValidateLinks(links: Array<{ name: string; href: string }>): { total: number valid: number broken: number redirected: number brokenLinks: Array<{ name: string; href: string; redirectTo?: string }> }; L52 callback (inline callback)(link); L57 callback (inline callback)(); L59 callback (inline callback)(r); L63 callback (inline callback)(b); L71 callback (inline callback)(r); L72 callback (inline callback)(r); L73 callback (inline callback)(r); L74 callback (inline callback)(r) |
| `info.php` | PHP · 19 bytes | Project configuration, source, or static asset |
| `LAND2LAND_ENHANCEMENTS.md` | Markdown documentation · 5,413 bytes | Project documentation |
| `lib/agent-subscriptions.ts` | TypeScript · 48,011 bytes · 1028 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: const SUBSCRIPTION_COLLECTIONS, const DEFAULT_PLAN_CATEGORIES, class AgentSubscriptionError, function parseObjectId, function serializeMongoValue, function ensureAgentSubscriptionIndexes, function runAgentTransaction, function initializeDefaultPlanCategories, function validatePlanConfiguration, function getAgentSubscriptionOverview, function recordAgentAdminActivity, function recordAgentQuotaTransaction, function assignAgentPlan, function updateAgentSubscription, function setAgentAccountControls, function adjustAgentCredits, function reviewListingWithQuota, function removeListingWithQuotaRefund, function updateAssociateListingWithQuota, function createAdminActivityLog, re-export<br>imports: mongodb, @/lib/mongodb, @/lib/models<br>functions/methods (51): L31 callback (inline callback)(plan_code, index); L50 constructor (inline callback)(message: string, readonly status = 400, readonly code = "SUBSCRIPTION_ERROR"); L60 function parseObjectId(value: unknown, label = "ID"): ObjectId; L66 function serializeMongoValue(value: any): any; L71 callback (inline callback)([key, item]); L78 function async ensureAgentSubscriptionIndexes(db: Db); L122 callback (inline callback)(); L122 callback (inline callback)(error); L130 function async runAgentTransaction(work: (db: Db, session: ClientSession) => Promise<T>): Promise<T>; L135 callback (inline callback)(); L143 function async initializeDefaultPlanCategories(db: Db, actorId: ObjectId); L146 callback (inline callback)(plan); L156 function validatePlanConfiguration(input: Record<string, any>); L167 callback (inline callback)(item); L199 callback (inline callback)(item: string); L207 function ownerMatch(agentId: ObjectId); L211 function dateOrNull(value: unknown); L217 function async getAgentSubscriptionOverview(db: Db, agentIdValue: unknown, includeInternal = false, includeHistory = true); L253 callback (inline callback)(lot); L257 callback (inline callback)(lot); L262 callback (inline callback)(lot); L266 callback (inline callback)(sum, lot); L267 callback (inline callback)(sum, lot); L268 callback (inline callback)(sum, lot); L269 callback (inline callback)(sum, lot); L281 callback (inline callback)({ admin_notes, assigned_by, ...item }); L282 callback (inline callback)({ note, actor_id, ...item }); L283 callback (inline callback)({ provider_reference, ...item }); L326 function async recordAgentAdminActivity(db: Db, session: ClientSession, input: { actorId: ObjectId agentId?: ObjectId entityType?: "agent" \| "subscription_plan" \| "listing" entityId?: string action: string note?: string before?: unknown after?: unknown }); L356 function async recordAgentQuotaTransaction(db: Db, session: ClientSession, input: { agentId: ObjectId subscriptionId?: ObjectId \| null listingId?: ObjectId \| null creditLotId?: ObjectId \| null type: string source: string amount: number note?: string actorId?: ObjectId idempotencyKey: string }); L387 function computeExpiry(plan: any, start: Date, override?: unknown); L410 function async countPublishedListings(db: Db, agentId: ObjectId, session: ClientSession); L419 function async assignAgentPlan(input: { agentId: string planCode: SubscriptionPlanCode actorId: ObjectId note?: string customQuota?: number startsAt?: string expiresAt?: string \| null }); L432 callback async (inline callback)(db, session); L526 function async updateAgentSubscription(input: { agentId: string actorId: ObjectId action: "adjust_quota" \| "set_expiry" \| "reset_usage" planQuota?: number expiresAt?: string \| null note?: string }); L535 callback async (inline callback)(db, session); L585 function async setAgentAccountControls(input: { agentId: string actorId: ObjectId accountStatus?: "active" \| "inactive" \| "suspended" adminNotes?: string }); L592 callback async (inline callback)(db, session); L612 function async adjustAgentCredits(input: { agentId: string actorId: ObjectId action: "grant" \| "deduct" amount: number expiresAt?: string \| null note?: string idempotencyKey?: string }); L625 callback async (inline callback)(db, session); L673 callback (inline callback)(a, b); L678 callback (inline callback)(sum, lot); L744 function async refundListingQuota(db: Db, session: ClientSession, listing: any, actorId: ObjectId, reason: string); L785 function async reviewListingWithQuota(input: { listingId: string action: "approve" \| "reject" notes?: string actorId: ObjectId }); L792 callback async (inline callback)(db, session); L836 callback (inline callback)(a, b); L927 function async removeListingWithQuotaRefund(input: { listingId: string actorId: ObjectId agentId?: ObjectId \| null reason: string }); L934 callback async (inline callback)(db, session); L960 function async updateAssociateListingWithQuota(input: { listingId: string agentId: ObjectId body: Record<string, any> }); L966 callback async (inline callback)(db, session); L1017 function async createAdminActivityLog(db: Db, session: ClientSession, input: { actorId: ObjectId agentId: ObjectId action: string note?: string before?: unknown after?: unknown }) |
| `lib/agreement-links.ts` | TypeScript · 2,214 bytes · 65 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: typealias UserType, interface AgreementDocument, const AGREEMENT_DOCUMENTS, function getAgreementsForUserType, function getAgreementUrl, function getAgreementName<br>functions/methods (4): L39 function getAgreementsForUserType(userType: UserType): AgreementDocument[]; L40 callback (inline callback)(doc); L44 function getAgreementUrl(agreementId: string): string; L56 function getAgreementName(agreementId: string): string |
| `lib/api-client.ts` | TypeScript · 1,154 bytes · 51 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function apiCall, function get, function post, function put, function del<br>functions/methods (5): L3 function async apiCall(endpoint: string, options: RequestInit = {}): Promise<any>; L31 function async get(endpoint: string); L35 function async post(endpoint: string, body: any); L42 function async put(endpoint: string, body: any); L49 function async del(endpoint: string) |
| `lib/auth.ts` | TypeScript · 1,914 bytes · 79 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: interface User, function getCurrentUser, function requireAuth, function requireAdmin, function requireAssociate, function hashPassword, function verifyPassword<br>imports: next/headers, mongodb, bcryptjs, @/lib/session-token<br>functions/methods (6): L20 function async getCurrentUser(): Promise<User \| null>; L49 function async requireAuth(); L57 function async requireAdmin(); L65 function async requireAssociate(); L73 function async hashPassword(password: string): Promise<string>; L77 function async verifyPassword(password: string, hash: string): Promise<boolean> |
| `lib/blog-auto-link.ts` | TypeScript · 7,149 bytes · 210 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: interface PropertyCandidate, interface AutoLinkResult, function injectPropertyLinks, function fetchPropertyCandidates<br>imports: mongodb<br>functions/methods (11): L41 function getPropertyTypeSlug(propertyType: string): string; L45 callback (inline callback)(t); L50 function buildPropertyUrl(p: PropertyCandidate): string; L60 function buildPhrases(p: PropertyCandidate): string[]; L65 callback (inline callback)(v): v is string; L68 callback (inline callback)(a, b); L78 function isInsideProtectedTag(html: string, index: number): boolean; L99 callback (inline callback)(t); L111 function injectPropertyLinks(html: string, listings: PropertyCandidate[], maxLinks = 5): AutoLinkResult; L174 function async fetchPropertyCandidates(mongoUrl: string): Promise<PropertyCandidate[]>; L200 callback (inline callback)(d) |
| `lib/category-faqs.ts` | TypeScript · 19,269 bytes · 257 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: typealias CategoryFAQ, const CATEGORY_FAQS, function getCategoryFAQs<br>imports: @/lib/models<br>functions/methods (2): L9 callback point(label: string, text: string); L255 function getCategoryFAQs(type: LandType): CategoryFAQ[] \| null |
| `lib/db.ts` | TypeScript · 1,014 bytes · 34 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function connectToDatabase, function getDatabase<br>imports: mongodb<br>functions/methods (2): L8 function async connectToDatabase(); L31 function async getDatabase() |
| `lib/email.ts` | TypeScript · 27,753 bytes · 717 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function getEmailTransporter, function contactAdminTemplate, function contactUserTemplate, function propertyEnquiryAdminTemplate, function propertyEnquiryUserTemplate, function serviceEnquiryAdminTemplate, function serviceEnquiryUserTemplate, function quoteAdminTemplate, function quoteUserTemplate, function welcomeUserTemplate, function newUserAdminTemplate, function sellEnquiryAdminTemplate, function sellEnquiryOwnerTemplate, function sendEmail<br>imports: nodemailer<br>functions/methods (15): L10 function getEmailTransporter(); L28 function emailWrapper(content: string, previewText?: string); L108 function contactAdminTemplate(data: { name: string email: string phone: string subject: string message: string }); L156 function contactUserTemplate(data: { name: string; subject: string }); L185 function propertyEnquiryAdminTemplate(data: { name: string email?: string phone: string message?: string property_name?: string property_slug?: string }); L246 function propertyEnquiryUserTemplate(data: { name: string property_name?: string property_slug?: string }); L289 function serviceEnquiryAdminTemplate(data: { name: string email: string phone: string service_name: string preferred_contact?: string message?: string }); L344 function serviceEnquiryUserTemplate(data: { name: string service_name: string }); L383 function quoteAdminTemplate(data: { name: string email: string phone: string serviceType: string propertyType: string roofSize?: string urgency?: string details?: string }); L450 function quoteUserTemplate(data: { name: string serviceType: string }); L480 function welcomeUserTemplate(data: { name: string email: string user_type: string }); L537 function newUserAdminTemplate(data: { name: string email: string phone: string user_type: string }); L582 function sellEnquiryAdminTemplate(data: { ownerName: string ownerEmail: string ownerPhone: string propertyType: string size: string sizeUnit: string location: string state: string price: string facilities: string[] description: string }); L653 function sellEnquiryOwnerTemplate(data: { ownerName: string propertyType: string size: string sizeUnit: string location: string state: string }); L687 function async sendEmail({ to, subject, html, }: { to: string \| string[] subject: string html: string }) |
| `lib/firebase.ts` | TypeScript · 1,174 bytes · 34 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: const isFirebaseConfigured, re-export, default export<br>imports: firebase/app, firebase/auth |
| `lib/imagekit.ts` | TypeScript · 2,027 bytes · 71 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function getImageKitAuthenticationParameters, function uploadToImageKit, re-export<br>imports: crypto<br>functions/methods (2): L5 function getImageKitAuthenticationParameters(); L23 function async uploadToImageKit(file: Buffer \| string, fileName: string, folder = "countryroof"): Promise<{ url: string; fileId: string; name: string; thumbnailUrl?: string; size?: number }> |
| `lib/import-export.ts` | TypeScript · 7,882 bytes · 308 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: interface ValidationResult, interface ImportValidationReport, const VALIDATION_SCHEMAS, function parseCSV, function parseXLSX, function validateRecord, function generateValidationReport, function generateCSVFromData, function generateXLSXFromData<br>imports: csv-parse/sync, xlsx<br>functions/methods (16): L135 function parseCSV(fileContent: string): any[]; L148 function parseXLSX(buffer: Buffer): any[]; L160 function validateRecord(record: any, entityType: keyof typeof VALIDATION_SCHEMAS, index: number): ValidationResult[]; L200 function generateValidationReport(records: any[], entityType: keyof typeof VALIDATION_SCHEMAS): ImportValidationReport; L210 callback (inline callback)(field); L220 callback (inline callback)(record, index); L234 callback (inline callback)(result); L243 callback (inline callback)(r); L252 callback (inline callback)(field); L263 callback (inline callback)(r); L268 function generateCSVFromData(data: any[], entityType: keyof typeof VALIDATION_SCHEMAS): string; L275 callback (inline callback)(record); L277 callback (inline callback)(header); L290 function generateXLSXFromData(data: any[], entityType: keyof typeof VALIDATION_SCHEMAS): Buffer; L295 callback (inline callback)(record); L297 callback (inline callback)(header) |
| `lib/land-types-content.ts` | TypeScript · 10,007 bytes · 243 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: interface LandTypeContent, const LAND_TYPE_CONTENT, const LAND_TYPE_LIST, function getLandTypeBySlug, function getLandTypeLabel<br>imports: @/lib/models<br>functions/methods (4): L226 callback (inline callback)(t); L229 callback (inline callback)(acc, t); L236 function getLandTypeBySlug(slug: string): LandTypeContent \| null; L241 function getLandTypeLabel(type: string): string |
| `lib/link-validator.test.ts` | TypeScript · 4,335 bytes · 146 lines | Shared domain, persistence, integration, validation, or server utility<br>imports: ./link-validator<br>functions/methods (18): L20 callback (inline callback)(); L21 callback (inline callback)(); L22 callback (inline callback)(); L27 callback (inline callback)(); L32 callback (inline callback)(); L37 callback (inline callback)(); L43 callback (inline callback)(); L49 callback (inline callback)(); L56 callback (inline callback)(); L57 callback (inline callback)(); L62 callback (inline callback)(); L67 callback (inline callback)(); L73 callback (inline callback)(); L74 callback (inline callback)(); L89 callback (inline callback)(); L90 callback (inline callback)(); L104 callback (inline callback)(); L105 callback (inline callback)() |
| `lib/link-validator.ts` | TypeScript · 4,090 bytes · 174 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: interface FooterLink, interface LinkValidationResult, function validateLink, function getCorrectHref, function validateFooterLinks, function getBrokenLinks, function getLinksReport<br>functions/methods (13): L71 function validateLink(href: string): LinkValidationResult; L120 function getCorrectHref(href: string): string; L130 function validateFooterLinks(links: FooterLink[]): LinkValidationResult[]; L131 callback (inline callback)(link); L139 function getBrokenLinks(links: FooterLink[]): Array<FooterLink & LinkValidationResult>; L141 callback (inline callback)(link); L145 callback (inline callback)(link); L153 function getLinksReport(links: FooterLink[]): { total: number valid: number broken: number redirected: number brokenLinks: Array<FooterLink & LinkValidationResult> }; L162 callback (inline callback)(link); L169 callback (inline callback)(r); L170 callback (inline callback)(r); L171 callback (inline callback)(r); L172 callback (inline callback)(r) |
| `lib/median-server.ts` | TypeScript · 223 bytes · 5 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function isMedianUserAgent<br>functions/methods (1): L3 function isMedianUserAgent(userAgent: string \| null \| undefined): boolean |
| `lib/median.ts` | TypeScript · 2,333 bytes · 71 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: typealias AppPlatform, function detectPlatform, function useAppPlatform, function hasMedianSocialLogin, function medianSocialLogin<br>imports: react<br>functions/methods (9): L7 function detectPlatform(): AppPlatform; L18 callback noopSubscribe(); L18 callback (inline callback)(); L21 function useAppPlatform(): AppPlatform \| null; L22 callback (inline callback)(); L43 function hasMedianSocialLogin(provider: "google" \| "apple"): boolean; L48 function medianSocialLogin(provider: "google" \| "apple"): Promise<MedianSocialResponse>; L49 callback (inline callback)(resolve, reject); L55 callback callback(response: MedianSocialResponse) |
| `lib/models.ts` | TypeScript · 16,558 bytes · 554 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: const COLLECTIONS, typealias UserType, interface User, typealias AgentAccountStatus, typealias SubscriptionPlanCode, typealias SubscriptionPlanStatus, typealias SubscriptionBillingCycle, typealias AgentSubscriptionStatus, typealias SubscriptionPaymentStatus, interface SubscriptionPlan, interface AgentSubscription, interface AgentCreditLot, interface AgentQuotaTransaction, interface AgentSubscriptionPayment, interface AdminActivityLog, const LAND_TYPES, typealias LandType, const LAND_TYPE_LABELS, const AREA_UNITS, typealias AreaUnit, typealias OwnershipType, typealias Facing, typealias LandDocumentKey, const LAND_DOCUMENT_TYPES, interface LandDocumentFile, typealias ReviewStatus, interface Listing, typealias Property, interface State, interface Category, interface Amenities, interface Seller, typealias Builder, interface Facilities, interface Review, interface Ticket, interface News, typealias LeadStatus, typealias LeadSource, typealias LeadPriority, interface Lead, interface LeadWithDetails, interface Testimonial, typealias ReraRequestStatus, const RERA_REQUEST_STATUSES, const RERA_STATUS_LABELS, typealias ReraApplicantType, const RERA_APPLICANT_TYPE_LABELS, interface ReraRequestedDocument, interface ReraStageEvent, interface ReraRequest |
| `lib/modern-polyfill.js` | JavaScript · 241 bytes · 4 lines | Shared domain, persistence, integration, validation, or server utility |
| `lib/mongodb.ts` | TypeScript · 1,356 bytes · 46 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function connectToDatabase, function getDatabase, function connectDB<br>imports: mongodb<br>functions/methods (3): L6 function async connectToDatabase(); L39 function async getDatabase(); L44 function async connectDB() |
| `lib/otp.ts` | TypeScript · 6,435 bytes · 177 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function normalizePhone, function isValidIndianMobile, function createVerificationToken, function verifyVerificationToken, interface SendOtpResult, function sendOtp, interface VerifyOtpResult, function verifyOtp<br>imports: crypto<br>functions/methods (7): L22 function getSecret(): string; L35 function normalizePhone(phone: string): string; L42 function isValidIndianMobile(phone: string): boolean; L51 function createVerificationToken(phone: string): string; L60 function verifyVerificationToken(token: string, phone: string): boolean; L95 function async sendOtp(rawPhone: string): Promise<SendOtpResult>; L137 function async verifyOtp(rawPhone: string, rawCode: string, sessionId: string): Promise<VerifyOtpResult> |
| `lib/reward-system.ts` | TypeScript · 9,095 bytes · 92 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: class RewardError, function parseRewardId, function ensureRewardIndexes, function getAgentRewardOverview, function approveRewardSubmission, function adjustRewardPoints<br>imports: mongodb, @/lib/agent-subscriptions<br>functions/methods (8): L6 constructor (inline callback)(message: string, status = 400); L12 function parseRewardId(value: string); L17 function async ensureRewardIndexes(db: Db); L30 function async getAgentRewardOverview(db: Db, agentId: ObjectId); L45 function async approveRewardSubmission(submissionId: ObjectId, actorId: ObjectId, action: "approved" \| "rejected" \| "revision_requested", feedback = ""); L46 callback async (inline callback)(db, session); L75 function async adjustRewardPoints(agentId: ObjectId, actorId: ObjectId, action: "grant" \| "deduct", points: number, reason: string); L77 callback async (inline callback)(db, session) |
| `lib/schema-markup-generator.ts` | TypeScript · 14,588 bytes · 466 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function generateBlogSchema, function generatePropertySchema, function generateOrganizationSchema, function generatePropertyBreadcrumbSchema, function generateWebPageSchema, function generateLocalBusinessSchema<br>functions/methods (10): L19 function generateBlogSchema(post: any, authorName: string); L84 callback (inline callback)(faq: FAQItem); L90 callback (inline callback)(faq: FAQItem); L144 function generatePropertySchema(property: any); L265 callback (inline callback)(amenity: string); L277 function generateOrganizationSchema(); L340 function generatePropertyBreadcrumbSchema(property: any, propertyTypeSlug: string, propertyTypeDisplayName: string); L383 function generateWebPageSchema(page: { title: string description: string url: string breadcrumbs?: Array<{ name: string; url: string }> }); L415 callback (inline callback)(item, index); L429 function generateLocalBusinessSchema() |
| `lib/schemas.ts` | TypeScript · 12,300 bytes · 503 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: interface User, interface Property, interface State, interface Category, interface Amenities, interface Builder, interface Facilities, interface Review, interface Ticket, interface News, interface SectionProperty, interface HomepageSection, interface Developer, interface SEOPageSettings, interface Location<br>imports: mongodb |
| `lib/session-token.ts` | TypeScript · 1,767 bytes · 43 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function createSessionToken, function verifySessionToken<br>imports: crypto<br>functions/methods (3): L5 function getSecret(): string; L15 function createSessionToken(payload: { userId: unknown; email?: string \| null }): string; L26 function verifySessionToken(token: string \| undefined \| null): SessionPayload \| null |
| `lib/social-auth.ts` | TypeScript · 2,759 bytes · 84 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: typealias SocialProvider, function socialSignIn, function dashboardPathFor<br>imports: firebase/auth, @/lib/firebase, @/lib/median<br>functions/methods (5): L16 function async firebaseSignIn(provider: SocialProvider): Promise<User>; L37 callback (inline callback)(); L53 function async socialSignIn(provider: SocialProvider, userType?: "customer" \| "associate"): Promise<{ user_type: string }>; L75 callback (inline callback)(); L80 function dashboardPathFor(userType?: string) |
| `lib/utils-api.ts` | TypeScript · 1,485 bytes · 67 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function apiCall, function generateSlug, function validateEmail, function formatPrice, function formatDate, function isValidObjectId<br>imports: mongodb<br>functions/methods (6): L3 function async apiCall(endpoint: string, method: "GET" \| "POST" \| "PUT" \| "DELETE" = "GET", body?: any); L29 function generateSlug(text: string): string; L38 function validateEmail(email: string): boolean; L43 function formatPrice(price: number): string; L52 function formatDate(date: Date \| string): string; L60 function isValidObjectId(id: string): boolean |
| `lib/utils-db.ts` | TypeScript · 1,321 bytes · 49 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function isValidObjectId, function toObjectId, function getDocumentById, function getDocumentsWithPagination, function createSlug<br>imports: mongodb, ./db<br>functions/methods (5): L5 function isValidObjectId(id: string): boolean; L10 function toObjectId(id: string); L15 function async getDocumentById(collection: string, id: string); L22 function async getDocumentsWithPagination(collection: string, filter: object = {}, page = 1, limit = 12); L42 function createSlug(text: string): string |
| `lib/utils.ts` | TypeScript · 5,579 bytes · 150 lines | Shared domain, persistence, integration, validation, or server utility<br>exports: function cn, function formatPriceToIndian, function formatPriceRange, function parsePriceFromIndian, const BUDGET_RANGES, function getBudgetRangeFromPrices, function parseBudgetRange, function getPropertyTypeSlug, function isOfficeSpaceProperty, function getPropertyUrl, function getValidImageUrl<br>imports: clsx, tailwind-merge<br>functions/methods (12): L4 function cn(...inputs: ClassValue[]); L9 function formatPriceToIndian(price: number \| undefined \| null): string; L35 function formatPriceRange(lowestPrice?: number \| null, maxPrice?: number \| null): string; L49 function parsePriceFromIndian(priceStr: string): number \| null; L83 function getBudgetRangeFromPrices(minPrice?: string, maxPrice?: string): string; L89 function parseBudgetRange(budgetValue: string): { min: number \| null; max: number \| null }; L106 function getPropertyTypeSlug(propertyType?: string \| null): string; L110 callback (inline callback)(t); L120 function isOfficeSpaceProperty(propertyType?: string \| null): boolean; L123 callback (inline callback)(t); L126 function getPropertyUrl(property: { slug?: string \| null; _id: string; property_type?: string \| null }): string; L136 function getValidImageUrl(imageUrl?: string \| null, fallback: string = '/images/placeholder.jpg'): string |
| `llms.txt` | Text file · 7,076 bytes | Project configuration, source, or static asset |
| `md.md` | Markdown documentation · 3 bytes | Project documentation |
| `middleware.ts` | TypeScript · 3,216 bytes · 91 lines | Project configuration, source, or static asset<br>exports: function middleware, const config<br>imports: next/server, next/server<br>functions/methods (1): L19 function async middleware(request: NextRequest) |
| `next.config.mjs` | ES module · 8,905 bytes · 263 lines | Project configuration, source, or static asset<br>exports: default export<br>functions/methods (4): L87 method webpack(config); L97 method async headers(); L188 method async rewrites(); L199 method async redirects() |
| `package.json` | JSON data/config · 4,512 bytes | Project/tool configuration or structured data |
| `postcss.config.mjs` | ES module · 144 bytes · 8 lines | Project configuration, source, or static asset<br>exports: default export |
| `PROJECT_CODEBASE_REFERENCE.md` | Markdown reference · self-inventory | This complete tracked-file and static source-symbol reference |
| `property-detail.png` | PNG image · 507,394 bytes | Static image/icon asset |
| `property-details-section.png` | PNG image · 139,049 bytes | Static image/icon asset |
| `propety.json` | JSON data/config · 3,643 bytes | Project/tool configuration or structured data |
| `public/apple-icon.png` | PNG image · 2,626 bytes | Publicly served asset or browser script |
| `public/apple-touch-icon-median.png` | PNG image · 18,052 bytes | Publicly served asset or browser script |
| `public/apple-touch-icon.png` | PNG image · 265,769 bytes | Publicly served asset or browser script |
| `public/banner-agricultural.webp` | WebP image · 150,848 bytes | Publicly served asset or browser script |
| `public/banner-all.webp` | WebP image · 151,280 bytes | Publicly served asset or browser script |
| `public/banner-commercial.webp` | WebP image · 167,352 bytes | Publicly served asset or browser script |
| `public/banner-farmland.webp` | WebP image · 192,466 bytes | Publicly served asset or browser script |
| `public/banner-industrial.webp` | WebP image · 192,994 bytes | Publicly served asset or browser script |
| `public/banner-residential.webp` | WebP image · 181,808 bytes | Publicly served asset or browser script |
| `public/banner-slide-1.png` | PNG image · 715,391 bytes | Publicly served asset or browser script |
| `public/banner-slide-2.png` | PNG image · 725,487 bytes | Publicly served asset or browser script |
| `public/banner-slide-3.png` | PNG image · 783,752 bytes | Publicly served asset or browser script |
| `public/banner-slide-4.png` | PNG image · 784,030 bytes | Publicly served asset or browser script |
| `public/banners/banner-agricultural.png` | PNG image · 2,179,938 bytes | Publicly served asset or browser script |
| `public/banners/banner-agricultural.webp` | WebP image · 150,848 bytes | Publicly served asset or browser script |
| `public/banners/banner-all.png` | PNG image · 2,203,657 bytes | Publicly served asset or browser script |
| `public/banners/banner-all.webp` | WebP image · 151,280 bytes | Publicly served asset or browser script |
| `public/banners/banner-commercial.png` | PNG image · 2,334,658 bytes | Publicly served asset or browser script |
| `public/banners/banner-commercial.webp` | WebP image · 167,352 bytes | Publicly served asset or browser script |
| `public/banners/banner-farmland.png` | PNG image · 2,316,628 bytes | Publicly served asset or browser script |
| `public/banners/banner-farmland.webp` | WebP image · 192,466 bytes | Publicly served asset or browser script |
| `public/banners/banner-industrial.png` | PNG image · 2,300,876 bytes | Publicly served asset or browser script |
| `public/banners/banner-industrial.webp` | WebP image · 192,994 bytes | Publicly served asset or browser script |
| `public/banners/banner-residential.png` | PNG image · 2,439,913 bytes | Publicly served asset or browser script |
| `public/banners/banner-residential.webp` | WebP image · 181,808 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-1.jpg` | JPEG image · 41,382 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-1.webp` | WebP image · 26,164 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-2.jpg` | JPEG image · 43,590 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-2.webp` | WebP image · 27,544 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-3.jpg` | JPEG image · 44,672 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-3.webp` | WebP image · 29,068 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-4.jpg` | JPEG image · 47,081 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-4.webp` | WebP image · 31,896 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-5.webp` | WebP image · 36,348 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-6.webp` | WebP image · 34,540 bytes | Publicly served asset or browser script |
| `public/banners/home-mob-banner-7.webp` | WebP image · 15,982 bytes | Publicly served asset or browser script |
| `public/banners/land-banner-1.png` | PNG image · 1,732,876 bytes | Publicly served asset or browser script |
| `public/banners/land-banner-2.png` | PNG image · 2,306,384 bytes | Publicly served asset or browser script |
| `public/banners/land-banner-3.png` | PNG image · 1,925,722 bytes | Publicly served asset or browser script |
| `public/banners/land-banner-4.png` | PNG image · 2,101,600 bytes | Publicly served asset or browser script |
| `public/blog-banner.jpg` | JPEG image · 82,550 bytes | Publicly served asset or browser script |
| `public/cozy-family-house.png` | PNG image · 851,462 bytes | Publicly served asset or browser script |
| `public/dwarka-expressway-gurugram-modern-properties.jpg` | JPEG image · 221,542 bytes | Publicly served asset or browser script |
| `public/executive-apartment-interior-luxury.jpg` | JPEG image · 109,270 bytes | Publicly served asset or browser script |
| `public/fav.png` | PNG image · 228,101 bytes | Publicly served asset or browser script |
| `public/favicon-16x16.png` | PNG image · 228,101 bytes | Publicly served asset or browser script |
| `public/favicon-32x32.png` | PNG image · 228,101 bytes | Publicly served asset or browser script |
| `public/favicon-64x64.png` | PNG image · 228,101 bytes | Publicly served asset or browser script |
| `public/favicon.ico` | ICO image · 112,796 bytes | Publicly served asset or browser script |
| `public/golf-course-extension-road-properties.jpg` | JPEG image · 155,691 bytes | Publicly served asset or browser script |
| `public/golf-course-road-gurugram-luxury-properties.jpg` | JPEG image · 151,044 bytes | Publicly served asset or browser script |
| `public/google2a84e53130347dd4.html` | HTML document · 53 bytes | Publicly served asset or browser script |
| `public/google6f4a1e619e90c33a.html` | HTML document · 54 bytes | Publicly served asset or browser script |
| `public/googlec8f150c9f14d99a9.html` | HTML document · 54 bytes | Publicly served asset or browser script |
| `public/home-banner-1.jpg` | JPEG image · 118,899 bytes | Publicly served asset or browser script |
| `public/home-banner-1.webp` | WebP image · 72,920 bytes | Publicly served asset or browser script |
| `public/home-banner-2.jpg` | JPEG image · 137,846 bytes | Publicly served asset or browser script |
| `public/home-banner-2.webp` | WebP image · 87,838 bytes | Publicly served asset or browser script |
| `public/home-banner-3.jpg` | JPEG image · 142,888 bytes | Publicly served asset or browser script |
| `public/home-banner-3.webp` | WebP image · 93,232 bytes | Publicly served asset or browser script |
| `public/home-banner-4.jpg` | JPEG image · 169,253 bytes | Publicly served asset or browser script |
| `public/home-banner-4.webp` | WebP image · 124,100 bytes | Publicly served asset or browser script |
| `public/home-banner-5.webp` | WebP image · 93,360 bytes | Publicly served asset or browser script |
| `public/home-banner-6.webp` | WebP image · 73,952 bytes | Publicly served asset or browser script |
| `public/home-banner-7.webp` | WebP image · 83,210 bytes | Publicly served asset or browser script |
| `public/icon-dark-32x32.png` | PNG image · 585 bytes | Publicly served asset or browser script |
| `public/icon-light-32x32.png` | PNG image · 566 bytes | Publicly served asset or browser script |
| `public/icon.svg` | SVG image · 1,304 bytes | Publicly served asset or browser script |
| `public/icons/icon-192.jpeg` | JPEG image · 228,101 bytes | Publicly served asset or browser script |
| `public/icons/icon-192.png` | PNG image · 18,863 bytes | Publicly served asset or browser script |
| `public/icons/icon-512.jpeg` | JPEG image · 228,101 bytes | Publicly served asset or browser script |
| `public/icons/icon-512.png` | PNG image · 74,292 bytes | Publicly served asset or browser script |
| `public/images/fav.png` | PNG image · 12,819 bytes | Publicly served asset or browser script |
| `public/images/land/abadi-hero.png` | PNG image · 519,671 bytes | Publicly served asset or browser script |
| `public/images/land/agricultural-hero.png` | PNG image · 2,074,619 bytes | Publicly served asset or browser script |
| `public/images/land/commercial-hero.png` | PNG image · 1,677,466 bytes | Publicly served asset or browser script |
| `public/images/land/farmland-hero.png` | PNG image · 1,752,983 bytes | Publicly served asset or browser script |
| `public/images/land/industrial-hero.png` | PNG image · 1,798,053 bytes | Publicly served asset or browser script |
| `public/images/land/residential-hero.png` | PNG image · 1,998,874 bytes | Publicly served asset or browser script |
| `public/images/land/vacant-hero.png` | PNG image · 2,045,128 bytes | Publicly served asset or browser script |
| `public/images/logo.png` | PNG image · 96,198 bytes | Publicly served asset or browser script |
| `public/img/img215.jpg` | JPEG image · 122,591 bytes | Publicly served asset or browser script |
| `public/img/img228.jpg` | JPEG image · 646,194 bytes | Publicly served asset or browser script |
| `public/img/img232.jpg` | JPEG image · 319,261 bytes | Publicly served asset or browser script |
| `public/img/img238.jpg` | JPEG image · 78,792 bytes | Publicly served asset or browser script |
| `public/img/img241.jpg` | JPEG image · 99,435 bytes | Publicly served asset or browser script |
| `public/img/img256.jpg` | JPEG image · 65,428 bytes | Publicly served asset or browser script |
| `public/img/img288.jpg` | JPEG image · 200,071 bytes | Publicly served asset or browser script |
| `public/img/img291.jpg` | JPEG image · 541,871 bytes | Publicly served asset or browser script |
| `public/img/img294.jpg` | JPEG image · 304,953 bytes | Publicly served asset or browser script |
| `public/img/img351.jpg` | JPEG image · 207,574 bytes | Publicly served asset or browser script |
| `public/img/img359.jpg` | JPEG image · 133,099 bytes | Publicly served asset or browser script |
| `public/img/img385.jpg` | JPEG image · 657,822 bytes | Publicly served asset or browser script |
| `public/img/img388.jpg` | JPEG image · 270,187 bytes | Publicly served asset or browser script |
| `public/img/img389.jpg` | JPEG image · 680,467 bytes | Publicly served asset or browser script |
| `public/img/img390.jpg` | JPEG image · 8,321 bytes | Publicly served asset or browser script |
| `public/img/img394.jpg` | JPEG image · 939,606 bytes | Publicly served asset or browser script |
| `public/img/img397.jpg` | JPEG image · 110,918 bytes | Publicly served asset or browser script |
| `public/img/img400.jpg` | JPEG image · 741,591 bytes | Publicly served asset or browser script |
| `public/img/img403.jpg` | JPEG image · 750,544 bytes | Publicly served asset or browser script |
| `public/img/img404.jpg` | JPEG image · 126,098 bytes | Publicly served asset or browser script |
| `public/img/img408.jpg` | JPEG image · 821,487 bytes | Publicly served asset or browser script |
| `public/img/img411.jpg` | JPEG image · 261,259 bytes | Publicly served asset or browser script |
| `public/img/img419.jpg` | JPEG image · 186,268 bytes | Publicly served asset or browser script |
| `public/img/img431.jpg` | JPEG image · 211,807 bytes | Publicly served asset or browser script |
| `public/img/img441.jpg` | JPEG image · 335,956 bytes | Publicly served asset or browser script |
| `public/img/img442.jpg` | JPEG image · 316,644 bytes | Publicly served asset or browser script |
| `public/img/img443.jpg` | JPEG image · 287,560 bytes | Publicly served asset or browser script |
| `public/img/img444.jpg` | JPEG image · 319,596 bytes | Publicly served asset or browser script |
| `public/img/img461.jpg` | JPEG image · 255,079 bytes | Publicly served asset or browser script |
| `public/img/img463.jpg` | JPEG image · 11,356 bytes | Publicly served asset or browser script |
| `public/img/img469.jpg` | JPEG image · 717,337 bytes | Publicly served asset or browser script |
| `public/img/img472.jpg` | JPEG image · 264,023 bytes | Publicly served asset or browser script |
| `public/img/img478.jpg` | JPEG image · 13,121 bytes | Publicly served asset or browser script |
| `public/img/img482.jpg` | JPEG image · 312,480 bytes | Publicly served asset or browser script |
| `public/img/img483.jpg` | JPEG image · 210,459 bytes | Publicly served asset or browser script |
| `public/img/img484.jpg` | JPEG image · 275,134 bytes | Publicly served asset or browser script |
| `public/img/img491.jpg` | JPEG image · 609,800 bytes | Publicly served asset or browser script |
| `public/img/img492.jpg` | JPEG image · 290,498 bytes | Publicly served asset or browser script |
| `public/img/img495.jpg` | JPEG image · 224,727 bytes | Publicly served asset or browser script |
| `public/img/img498.jpg` | JPEG image · 137,932 bytes | Publicly served asset or browser script |
| `public/img/img501.jpg` | JPEG image · 574,899 bytes | Publicly served asset or browser script |
| `public/img/img504.jpg` | JPEG image · 919,642 bytes | Publicly served asset or browser script |
| `public/img/img507.jpg` | JPEG image · 456,675 bytes | Publicly served asset or browser script |
| `public/img/img510.jpg` | JPEG image · 49,580 bytes | Publicly served asset or browser script |
| `public/img/img513.jpg` | JPEG image · 952,293 bytes | Publicly served asset or browser script |
| `public/img/img517.jpg` | JPEG image · 103,879 bytes | Publicly served asset or browser script |
| `public/img/img519.jpg` | JPEG image · 48,472 bytes | Publicly served asset or browser script |
| `public/img/img522.jpg` | JPEG image · 139,176 bytes | Publicly served asset or browser script |
| `public/img/img523.jpg` | JPEG image · 17,566 bytes | Publicly served asset or browser script |
| `public/img/img527.jpg` | JPEG image · 252,455 bytes | Publicly served asset or browser script |
| `public/img/img531.jpg` | JPEG image · 301,499 bytes | Publicly served asset or browser script |
| `public/img/img534.jpg` | JPEG image · 572,396 bytes | Publicly served asset or browser script |
| `public/img/img537.jpg` | JPEG image · 216,664 bytes | Publicly served asset or browser script |
| `public/img/img540.jpg` | JPEG image · 350,394 bytes | Publicly served asset or browser script |
| `public/img/img541.jpg` | JPEG image · 129,905 bytes | Publicly served asset or browser script |
| `public/img/img609.jpg` | JPEG image · 50,609 bytes | Publicly served asset or browser script |
| `public/img/img677.jpg` | JPEG image · 65,432 bytes | Publicly served asset or browser script |
| `public/img/img747.jpg` | JPEG image · 33,455 bytes | Publicly served asset or browser script |
| `public/img/img817.jpg` | JPEG image · 46,419 bytes | Publicly served asset or browser script |
| `public/img/img853.jpg` | JPEG image · 393,024 bytes | Publicly served asset or browser script |
| `public/img/img860.jpg` | JPEG image · 562,046 bytes | Publicly served asset or browser script |
| `public/img/img863.jpg` | JPEG image · 535,701 bytes | Publicly served asset or browser script |
| `public/img/img866.jpg` | JPEG image · 112,114 bytes | Publicly served asset or browser script |
| `public/img/img869.jpg` | JPEG image · 181,517 bytes | Publicly served asset or browser script |
| `public/img/img9.jpg` | JPEG image · 55,450 bytes | Publicly served asset or browser script |
| `public/indian-businessman-portrait.png` | PNG image · 1,158,449 bytes | Publicly served asset or browser script |
| `public/indian-businesswoman-portrait.png` | PNG image · 750,210 bytes | Publicly served asset or browser script |
| `public/land-plot-aerial-view.jpg` | JPEG image · 334,223 bytes | Publicly served asset or browser script |
| `public/land-types/abadi.png` | PNG image · 519,671 bytes | Publicly served asset or browser script |
| `public/land-types/agricultural.png` | PNG image · 2,137,712 bytes | Publicly served asset or browser script |
| `public/land-types/commercial.png` | PNG image · 2,080,381 bytes | Publicly served asset or browser script |
| `public/land-types/farmland.png` | PNG image · 2,231,498 bytes | Publicly served asset or browser script |
| `public/land-types/industrial.png` | PNG image · 2,023,401 bytes | Publicly served asset or browser script |
| `public/land-types/na-plot.png` | PNG image · 2,027,562 bytes | Publicly served asset or browser script |
| `public/land-types/residential.png` | PNG image · 2,455,571 bytes | Publicly served asset or browser script |
| `public/llms.txt` | Text file · 7,076 bytes | Publicly served asset or browser script |
| `public/locations/dwarka-expressway.jpg` | JPEG image · 231,025 bytes | Publicly served asset or browser script |
| `public/locations/golf-course-extension.jpg` | JPEG image · 167,471 bytes | Publicly served asset or browser script |
| `public/locations/golf-course-road.jpg` | JPEG image · 212,195 bytes | Publicly served asset or browser script |
| `public/locations/manesar.jpg` | JPEG image · 269,953 bytes | Publicly served asset or browser script |
| `public/locations/new-gurgaon.jpg` | JPEG image · 252,812 bytes | Publicly served asset or browser script |
| `public/locations/nh-48.jpg` | JPEG image · 175,311 bytes | Publicly served asset or browser script |
| `public/locations/sohna.jpg` | JPEG image · 251,979 bytes | Publicly served asset or browser script |
| `public/locations/southern-peripheral-road.jpg` | JPEG image · 179,983 bytes | Publicly served asset or browser script |
| `public/logo.png` | PNG image · 74,292 bytes | Publicly served asset or browser script |
| `public/luxury-modern-real-estate-property-aerial-view-wit.jpg` | JPEG image · 293,826 bytes | Publicly served asset or browser script |
| `public/luxury-penthouse-interior-modern-design.jpg` | JPEG image · 115,981 bytes | Publicly served asset or browser script |
| `public/luxury-penthouse-interior.png` | PNG image · 720,478 bytes | Publicly served asset or browser script |
| `public/modern-apartment-living.png` | PNG image · 716,857 bytes | Publicly served asset or browser script |
| `public/modern-city-skyline.png` | PNG image · 1,033,760 bytes | Publicly served asset or browser script |
| `public/modern-luxury-property-aerial-view.jpg` | JPEG image · 189,285 bytes | Publicly served asset or browser script |
| `public/modern-luxury-property-exterior-sunset.jpg` | JPEG image · 93,511 bytes | Publicly served asset or browser script |
| `public/modern-luxury-villa-exterior-pool.jpg` | JPEG image · 174,779 bytes | Publicly served asset or browser script |
| `public/modern-luxury-villa.png` | PNG image · 957,030 bytes | Publicly served asset or browser script |
| `public/modern-office-building.png` | PNG image · 699,330 bytes | Publicly served asset or browser script |
| `public/modern-residential-apartment.png` | PNG image · 831,233 bytes | Publicly served asset or browser script |
| `public/new-gurgaon-properties-development.jpg` | JPEG image · 297,153 bytes | Publicly served asset or browser script |
| `public/new-slide-1.png` | PNG image · 715,391 bytes | Publicly served asset or browser script |
| `public/new-slide-2.png` | PNG image · 736,182 bytes | Publicly served asset or browser script |
| `public/new-slide-3.png` | PNG image · 791,857 bytes | Publicly served asset or browser script |
| `public/new-slide-4.png` | PNG image · 792,387 bytes | Publicly served asset or browser script |
| `public/nh-48-highway-properties-gurugram.jpg` | JPEG image · 242,349 bytes | Publicly served asset or browser script |
| `public/og-image.png` | PNG image · 1,721,212 bytes | Publicly served asset or browser script |
| `public/OneSignalSDKWorker.js` | JavaScript · 76 bytes · 1 lines | Publicly served asset or browser script |
| `public/open-book-knowledge.png` | PNG image · 759,294 bytes | Publicly served asset or browser script |
| `public/placeholder-logo.png` | PNG image · 568 bytes | Publicly served asset or browser script |
| `public/placeholder-logo.svg` | SVG image · 3,208 bytes | Publicly served asset or browser script |
| `public/placeholder-user.jpg` | JPEG image · 1,635 bytes | Publicly served asset or browser script |
| `public/placeholder.jpg` | JPEG image · 1,064 bytes | Publicly served asset or browser script |
| `public/placeholder.svg` | SVG image · 3,253 bytes | Publicly served asset or browser script |
| `public/professional-indian-business-executive-portrait.jpg` | JPEG image · 93,829 bytes | Publicly served asset or browser script |
| `public/regions/haryana.png` | PNG image · 2,156,148 bytes | Publicly served asset or browser script |
| `public/regions/maharashtra.png` | PNG image · 2,218,329 bytes | Publicly served asset or browser script |
| `public/regions/mp.png` | PNG image · 1,914,110 bytes | Publicly served asset or browser script |
| `public/regions/punjab.png` | PNG image · 1,988,025 bytes | Publicly served asset or browser script |
| `public/regions/rajasthan.png` | PNG image · 1,836,413 bytes | Publicly served asset or browser script |
| `public/regions/up.png` | PNG image · 1,918,316 bytes | Publicly served asset or browser script |
| `public/sohna-road-gurugram-properties.jpg` | JPEG image · 266,075 bytes | Publicly served asset or browser script |
| `public/southern-peripheral-road-gurugram-properties.jpg` | JPEG image · 175,285 bytes | Publicly served asset or browser script |
| `public/testimonials/1.png` | PNG image · 13,799 bytes | Publicly served asset or browser script |
| `public/testimonials/2.png` | PNG image · 16,739 bytes | Publicly served asset or browser script |
| `public/testimonials/3.png` | PNG image · 16,049 bytes | Publicly served asset or browser script |
| `public/testimonials/4.png` | PNG image · 17,210 bytes | Publicly served asset or browser script |
| `public/videos/ashiana-aaroham.mp4` | MP4 video · 829,258 bytes | Publicly served asset or browser script |
| `public/videos/elie-saab.mp4` | MP4 video · 573,968 bytes | Publicly served asset or browser script |
| `public/videos/gic-manesar.mp4` | MP4 video · 883,068 bytes | Publicly served asset or browser script |
| `public/videos/signature-sarvam.mp4` | MP4 video · 646,570 bytes | Publicly served asset or browser script |
| `public/videos/silverglades-the-legacy-sector-63a-gurgaon.mp4` | MP4 video · 840,780 bytes | Publicly served asset or browser script |
| `public/videos/sobha-crescent-sector-63a-gurgaon.mp4` | MP4 video · 847,181 bytes | Publicly served asset or browser script |
| `public/videos/sunteck-oceonpolis.mp4` | MP4 video · 1,098,082 bytes | Publicly served asset or browser script |
| `public/videos/tarc-Ishva.mp4` | MP4 video · 846,542 bytes | Publicly served asset or browser script |
| `public/village-cta-bg.png` | PNG image · 2,303,055 bytes | Publicly served asset or browser script |
| `public/village-fields-texture.png` | PNG image · 2,458,624 bytes | Publicly served asset or browser script |
| `README.md` | Markdown documentation · 6,877 bytes | Project documentation and setup guide |
| `scripts/find-agent-refs.py` | Python · 748 bytes | Maintenance, migration, or data-processing script |
| `scripts/find-agent-substrings.py` | Python · 502 bytes | Maintenance, migration, or data-processing script |
| `scripts/migrate-to-land2land.mjs` | ES module · 2,817 bytes · 87 lines | Maintenance, migration, or data-processing script<br>imports: mongodb<br>functions/methods (3): L34 function async main(); L40 callback (inline callback)(c); L84 callback (inline callback)(err) |
| `scripts/replace-agent-with-associate.py` | Python · 1,323 bytes | Maintenance, migration, or data-processing script |
| `styles/blog-content.css` | CSS · 3,510 bytes | Global or feature-level stylesheet |
| `styles/globals.css` | CSS · 4,353 bytes | Global or feature-level stylesheet |
| `tailwind.config.ts` | TypeScript · 2,857 bytes · 96 lines | Project configuration, source, or static asset<br>exports: default export<br>imports: tailwindcss |
| `test-db-connection.ts` | TypeScript · 964 bytes · 34 lines | Project configuration, source, or static asset<br>imports: dotenv, mongodb<br>functions/methods (2): L8 function async testConnection(); L23 callback (inline callback)(c) |
| `tsconfig.json` | JSON data/config · 695 bytes | Project/tool configuration or structured data |

## Reading the reference

- Search **Complete file-by-file reference** by path or symbol; use the preceding tree for hierarchy.
- `L<number>` is the source line at generation time and changes as files are edited.
- Import specifiers are recorded as written, not resolved into a dependency or runtime call graph; aliases are configured in `tsconfig.json`.
- Static symbol extraction documents declarations, not behavior or correctness. Read the route/component implementation to verify authorization, validation, persistence, and side effects.
