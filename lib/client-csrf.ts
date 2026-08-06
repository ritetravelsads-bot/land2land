/**
 * Client-side CSRF token management
 * Use these utilities in client components when making API requests
 */

import React from "react"

let cachedToken: string | null = null

/**
 * Fetch a fresh CSRF token from the server
 */
export async function fetchCsrfToken(): Promise<string> {
  try {
    const response = await fetch("/api/csrf-token", {
      method: "GET",
      credentials: "include", // Send cookies
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch CSRF token: ${response.statusText}`)
    }

    const data = await response.json()
    cachedToken = data.token

    return data.token
  } catch (error) {
    console.error("Error fetching CSRF token:", error)
    throw error
  }
}

/**
 * Get cached CSRF token or fetch a new one
 */
export async function getCsrfToken(): Promise<string> {
  if (cachedToken) {
    return cachedToken
  }

  return fetchCsrfToken()
}

/**
 * Make a mutation request (POST/PUT/DELETE/PATCH) with CSRF protection
 *
 * @example
 * const result = await makeMutationRequest('/api/admin/leads', 'POST', { name: 'John' })
 */
export async function makeMutationRequest<T = any>(
  url: string,
  method: "POST" | "PUT" | "DELETE" | "PATCH",
  data?: any,
  options?: RequestInit
): Promise<T> {
  // Get CSRF token
  const csrfToken = await getCsrfToken()

  // Make the request with CSRF token in header
  const response = await fetch(url, {
    method,
    credentials: "include", // Send cookies
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
      ...options?.headers,
    },
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const error = new Error(errorData.error || `HTTP ${response.status}`)
    throw error
  }

  return response.json()
}

/**
 * Hook for React components to use CSRF-protected mutations
 *
 * @example
 * const { mutate, loading, error } = useCsrfMutation('/api/admin/leads', 'POST')
 * await mutate({ name: 'John', phone: '555-1234' })
 */
export function useCsrfMutation<T = any>(
  url: string,
  method: "POST" | "PUT" | "DELETE" | "PATCH" = "POST"
) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  const mutate = React.useCallback(
    async (data?: any) => {
      setLoading(true)
      setError(null)

      try {
        const result = await makeMutationRequest<T>(url, method, data)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [url, method]
  )

  return { mutate, loading, error }
}
