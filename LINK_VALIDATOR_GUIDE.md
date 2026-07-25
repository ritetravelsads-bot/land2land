# Link Validator Guide

This guide explains how to use the link validation system to handle broken and redirected footer links.

## Overview

The link validation system prevents 404 errors by:
1. **Validating** all footer links against a list of valid routes
2. **Redirecting** broken links to appropriate fallback pages (usually home)
3. **Reporting** broken links during development
4. **Debugging** broken links with an optional debug panel

## Files Created

### Core Utilities
- **`lib/link-validator.ts`** - Main validation logic and routing map
- **`hooks/useValidateLink.ts`** - React hooks for link validation
- **`components/debug/LinkValidatorDebug.tsx`** - Debug UI component

### Modified Files
- **`components/layout/footer.tsx`** - Updated to use link validation

## Key Functions

### `validateLink(href: string): LinkValidationResult`
Validates a single link and returns its status.

```typescript
import { validateLink } from "@/lib/link-validator"

const result = validateLink("/some-page")
// Returns:
// {
//   isValid: true/false,
//   originalHref: "/some-page",
//   redirectTo?: "/redirect-target",
//   reason?: "explanation"
// }
```

### `getCorrectHref(href: string): string`
Gets the correct URL to navigate to (handles redirects).

```typescript
import { getCorrectHref } from "@/lib/link-validator"

const href = getCorrectHref("/career") // Returns "/"
```

### `validateFooterLinks(links: FooterLink[]): LinkValidationResult[]`
Validates multiple links at once.

```typescript
import { validateFooterLinks } from "@/lib/link-validator"

const results = validateFooterLinks([
  { name: "Career", href: "/career" },
  { name: "Home", href: "/" }
])
```

### `getLinksReport(links: FooterLink[])`
Gets a comprehensive report of link validation.

```typescript
import { getLinksReport } from "@/lib/link-validator"

const report = getLinksReport(footerLinks)
// Returns: { total, valid, broken, redirected, brokenLinks }
```

## React Hooks

### `useValidateLink(href: string)`
Hook to validate a single link and log warnings in development.

```typescript
import { useValidateLink } from "@/hooks/useValidateLink"

export function MyComponent() {
  const validation = useValidateLink("/some-page")
  
  if (!validation.isValid) {
    console.log(`Will redirect to: ${validation.redirectTo}`)
  }
  
  return <a href={validation.redirectTo || validation.originalHref}>Link</a>
}
```

### `useValidateLinks(links: Array<{name, href}>)`
Hook to validate multiple links and get statistics.

```typescript
import { useValidateLinks } from "@/hooks/useValidateLink"

export function MyComponent() {
  const report = useValidateLinks(footerLinks)
  
  console.log(`Found ${report.broken} broken links`)
  
  return <div>{report.total} total links</div>
}
```

## Debug Component

Show link validation status during development:

```typescript
import { LinkValidatorDebug } from "@/components/debug/LinkValidatorDebug"

export default function Footer() {
  return (
    <>
      <footer>{/* footer content */}</footer>
      <LinkValidatorDebug links={allFooterLinks} />
    </>
  )
}
```

The debug panel appears in the bottom-right corner and shows:
- Total number of links
- Number of valid links
- Number of redirected links
- List of broken links and where they redirect

## Adding Broken Link Redirects

When you discover a broken link, add it to the `LINK_REDIRECTS` map in `lib/link-validator.ts`:

```typescript
const LINK_REDIRECTS: Record<string, string> = {
  "/career": "/",              // Redirects to home
  "/sell": "/",                // Coming soon feature
  "/farm-advisory": "/blogs",  // Redirect to blog section
  "/tools/land-calculator": "/area-converter", // Actual existing page
}
```

## Adding Valid Routes

When you create a new page, add it to the `VALID_ROUTES` array:

```typescript
const VALID_ROUTES = [
  "/",
  "/about",
  "/properties",
  "/blogs",
  // Add your new page here:
  "/my-new-page",
]
```

## Link Validation Rules

1. **External Links** - Links starting with `http://` or `https://` are always valid
2. **Anchor Links** - Links starting with `#` are always valid
3. **Redirected Links** - Links in `LINK_REDIRECTS` are valid and will navigate to their mapped destination
4. **Valid Routes** - Links in `VALID_ROUTES` are valid
5. **Broken Links** - Everything else is considered broken and redirects to home (`/`)

## Usage in Components

### Footer Links (Already Implemented)
The footer component automatically uses `getCorrectHref()` for all links.

### Custom Component
```typescript
import Link from "next/link"
import { getCorrectHref } from "@/lib/link-validator"

export function MyNavigation() {
  const links = [
    { name: "Career", href: "/career" },
    { name: "Home", href: "/" }
  ]
  
  return (
    <nav>
      {links.map((link) => (
        <Link key={link.name} href={getCorrectHref(link.href)}>
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
```

## Development Mode Logging

When `process.env.NODE_ENV === "development"`, broken links will be logged to the console:

```
[Link Validator] Broken link detected: "/career" will redirect to "/" - Page does not exist, redirecting to home
```

## Testing

### Check if a link is valid
```typescript
import { validateLink } from "@/lib/link-validator"

const result = validateLink("/some-page")
console.log(result.isValid) // true or false
```

### Get all broken links
```typescript
import { getBrokenLinks } from "@/lib/link-validator"

const broken = getBrokenLinks(footerLinks)
console.log(broken) // Array of broken links
```

### Get a report
```typescript
import { getLinksReport } from "@/lib/link-validator"

const report = getLinksReport(footerLinks)
console.log(`${report.broken}/${report.total} links are broken`)
```

## Best Practices

1. **Update VALID_ROUTES** when you create new pages
2. **Add LINK_REDIRECTS** for deprecated pages
3. **Use getCorrectHref()** in all user-facing navigation
4. **Enable LinkValidatorDebug** component in development
5. **Check browser console** for link validation warnings
6. **Keep redirects simple** - redirect to existing pages only

## Future Improvements

Potential enhancements to the link validation system:
- API endpoint to programmatically fetch all valid routes from the app directory
- Automated link checker that runs on build time
- Visual diff showing which links changed
- Integration with analytics to track broken link clicks
- Automatic sitemap generation from valid routes

## Troubleshooting

### Links still going to 404
1. Check if the link is in `VALID_ROUTES`
2. Check if the link is in `LINK_REDIRECTS`
3. Verify the page file exists in `app/` directory
4. Clear Next.js cache: `rm -rf .next`

### Debug panel not showing
1. Make sure you added `<LinkValidatorDebug>` component to your page
2. Check if you're in development mode
3. Check browser console for errors

### Links not redirecting
1. Verify `getCorrectHref()` is being used for all links
2. Check that the link is properly wrapped with `<Link>` component
3. Make sure redirects are defined in `LINK_REDIRECTS`
