# Link Validator - Quick Reference

## 📌 What It Does
Automatically handles broken footer links to prevent 404 errors.

## 🚀 Quick Start

### Use in Components
```tsx
import { getCorrectHref } from "@/lib/link-validator"

<Link href={getCorrectHref("/career")}>Career</Link>
```

### With React Hook
```tsx
import { useValidateLink } from "@/hooks/useValidateLink"

const validation = useValidateLink("/career")
// Shows console warning if broken in dev mode
```

### View Debug Panel
```tsx
import { LinkValidatorDebug } from "@/components/debug/LinkValidatorDebug"

<LinkValidatorDebug links={footerLinks} />
// Shows in bottom-right corner in dev mode
```

## 📍 Current Broken Links
These redirect to home (`/`):
- `/career` → `/`
- `/sell` → `/`
- `/investments` → `/`
- `/find-associate` → `/`
- `/property-management` → `/`
- `/farms` → `/`
- `/farm-advisory` → `/`
- `/site-map` → `/`
- `/grievance-redressal` → `/`
- `/cookie-policy` → `/`
- `/disclaimer` → `/`

Special redirect:
- `/tools/land-calculator` → `/area-converter`

## ✅ Valid Routes (No Redirect)
- `/` (home)
- `/about`
- `/properties`
- `/blogs`
- `/contact`
- `/agricultural-land`
- `/farmland`
- `/plots-vacant`
- `/land-with-infrastructure`
- `/orchard-land`
- `/irrigation-land`
- `/privacy-policy`
- `/terms-and-conditions`
- `/account/delete`
- `/area-converter`

## 🔧 Common Tasks

### Add a New Page
1. Create page in `app/your-page/page.tsx`
2. Add to `VALID_ROUTES` in `lib/link-validator.ts`:
```typescript
const VALID_ROUTES = [
  "/",
  "/your-page", // ← Add this
]
```

### Fix a Broken Link Redirect
Edit `lib/link-validator.ts`:
```typescript
const LINK_REDIRECTS: Record<string, string> = {
  "/old-broken-link": "/new-correct-page", // ← Update
}
```

### Create Temporary Redirect (Coming Soon)
```typescript
const LINK_REDIRECTS: Record<string, string> = {
  "/coming-soon": "/", // Redirects to home until page is created
}
```

## 🧪 Test in Browser Console

### Check if link is valid
```javascript
import { validateLink } from "@/lib/link-validator"
validateLink("/career")
// Output: { isValid: true, redirectTo: "/", ... }
```

### Get correct URL
```javascript
import { getCorrectHref } from "@/lib/link-validator"
getCorrectHref("/career")
// Output: "/"
```

### Get all broken links
```javascript
import { getBrokenLinks } from "@/lib/link-validator"
getBrokenLinks(footerLinks)
// Output: Array of broken links
```

### Get statistics
```javascript
import { getLinksReport } from "@/lib/link-validator"
getLinksReport(footerLinks)
// Output: { total: 50, valid: 40, broken: 5, redirected: 5 }
```

## 📁 Files

| File | Purpose |
|------|---------|
| `lib/link-validator.ts` | Core validation logic |
| `hooks/useValidateLink.ts` | React hooks |
| `components/debug/LinkValidatorDebug.tsx` | Debug UI |
| `components/layout/footer.tsx` | Already using validator ✓ |
| `LINK_VALIDATOR_GUIDE.md` | Full documentation |
| `LINK_VALIDATOR_IMPLEMENTATION.md` | Implementation details |

## 🎯 Rules

1. **External Links** (http/https) → Always valid
2. **Anchor Links** (#) → Always valid
3. **Mapped in LINK_REDIRECTS** → Valid + redirects to mapped URL
4. **In VALID_ROUTES** → Valid
5. **Everything else** → Redirects to `/` (home)

## 💡 Tips

- Broken links show warnings in console during development
- Debug panel appears bottom-right in dev mode
- All redirects are client-side (instant)
- Production doesn't show console warnings
- External links and anchors are never validated

## ❓ Troubleshooting

**Links show 404?**
- Check if page exists in `app/` directory
- Add route to `VALID_ROUTES`
- Restart dev server

**Debug panel not showing?**
- Ensure in development mode (`npm run dev`)
- Add `<LinkValidatorDebug>` component to page
- Check browser console for errors

**Console warning but page exists?**
- Add page to `VALID_ROUTES` in `lib/link-validator.ts`
- Restart dev server

## 📚 More Info

See `LINK_VALIDATOR_GUIDE.md` for complete documentation.

---

**Key Functions Summary**

```typescript
validateLink(href)           // Check if link is valid
getCorrectHref(href)         // Get redirect destination
validateFooterLinks(links)   // Validate multiple
getBrokenLinks(links)        // Get broken links only
getLinksReport(links)        // Get statistics
useValidateLink(href)        // React hook (single)
useValidateLinks(links)      // React hook (multiple)
```

**Default Behavior:**
- Valid links → Use as-is
- Broken links → Redirect to `/`
- External links → Use as-is (always valid)
- Anchor links → Use as-is (always valid)
