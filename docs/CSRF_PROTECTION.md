# CSRF Protection Guide

This application implements Cross-Site Request Forgery (CSRF) protection on all state-changing API endpoints (POST, PUT, DELETE, PATCH).

## How It Works

1. **Token Generation**: CSRF tokens are generated server-side using cryptographically secure random bytes
2. **Cookie Storage**: Tokens are stored in HTTP-only, secure cookies (same-site: lax)
3. **Header Validation**: Tokens must be sent in the `x-csrf-token` request header
4. **Timing-Safe Comparison**: Tokens are compared using constant-time comparison to prevent timing attacks

## Server-Side (API Routes)

All mutation endpoints have been updated to validate CSRF tokens. Each handler now calls one of these auth functions at the start:

```typescript
// For admin endpoints
const user = await requireAdminWithCsrf(request)

// For authenticated user endpoints  
const user = await requireAuthWithCsrf(request)

// For agent/associate endpoints
const user = await requireAssociateWithCsrf(request)
```

If the CSRF token is invalid or missing, a `403 Forbidden` error is returned.

## Client-Side Implementation

### Option 1: Using the Helper Functions

```typescript
import { makeMutationRequest, getCsrfToken } from "@/lib/client-csrf"

// Simple mutation with automatic CSRF handling
const result = await makeMutationRequest(
  '/api/admin/leads',
  'POST',
  { name: 'John Doe', phone: '555-1234' }
)
```

### Option 2: Using the Hook (React Components)

```typescript
"use client"

import { useCsrfMutation } from "@/lib/client-csrf"

export function CreateLeadForm() {
  const { mutate, loading, error } = useCsrfMutation('/api/admin/leads', 'POST')

  const handleSubmit = async (formData) => {
    try {
      const result = await mutate(formData)
      console.log('Lead created:', result)
    } catch (err) {
      console.error('Error creating lead:', err)
    }
  }

  return (
    // form JSX
  )
}
```

### Option 3: Manual Implementation

```typescript
"use client"

import { getCsrfToken } from "@/lib/client-csrf"

export function MyComponent() {
  const handleClick = async () => {
    try {
      const token = await getCsrfToken()
      
      const response = await fetch('/api/admin/leads', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': token
        },
        body: JSON.stringify({ name: 'John', phone: '555-1234' })
      })

      if (!response.ok) throw new Error('Request failed')
      const data = await response.json()
      console.log('Success:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return <button onClick={handleClick}>Submit</button>
}
```

## API Endpoints

### GET /api/csrf-token

Returns a fresh CSRF token.

**Response:**
```json
{
  "token": "a1b2c3d4e5f6..."
}
```

**Usage:**
```typescript
const response = await fetch('/api/csrf-token', {
  credentials: 'include'
})
const { token } = await response.json()
```

## Protected Endpoints

All state-changing routes now require CSRF validation:

- `/api/admin/**` (except GET)
- `/api/agent/**` (except GET)  
- `/api/associate/**` (except GET)
- `/api/auth/**` (POST/DELETE)
- `/api/buyer/**` (POST/PUT/DELETE)
- `/api/blog/**` (POST/PUT/DELETE)
- `/api/upload/**` (POST)
- etc.

## Security Notes

- Tokens are valid for 24 hours and automatically refreshed when expired
- Tokens are stored in HTTP-only cookies, preventing JavaScript access
- Use `credentials: 'include'` in fetch requests to send cookies
- The `x-csrf-token` header name is fixed and non-configurable to prevent header injection
- Constant-time comparison prevents timing attacks

## Troubleshooting

### "CSRF token validation failed" Error

1. Ensure you're including the `x-csrf-token` header in the request
2. Verify the token was fetched with `credentials: 'include'`
3. Check that cookies are being sent (`credentials: 'include'` in fetch options)
4. The token should match the one in the `__Host-csrf-token` cookie

### Token Expires

If you get a validation error after a long time:
1. Tokens expire after 24 hours
2. Call `fetchCsrfToken()` to get a fresh token
3. The helper functions handle this automatically

### Testing CSRF Protection

To test CSRF protection in development:

```bash
# This should fail (no CSRF token)
curl -X POST http://localhost:3000/api/admin/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"test"}'

# This should succeed (with CSRF token from the cookie)
TOKEN=$(curl -s http://localhost:3000/api/csrf-token | jq -r .token)
curl -X POST http://localhost:3000/api/admin/leads \
  -H "Content-Type: application/json" \
  -H "x-csrf-token: $TOKEN" \
  -H "Cookie: __Host-csrf-token=$TOKEN" \
  -d '{"name":"test"}'
```
