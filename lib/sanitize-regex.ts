/**
 * Sanitize user input for use in MongoDB `$regex` queries.
 *
 * Escapes all regex metacharacters and enforces a maximum length to prevent:
 * - Regular Expression Denial of Service (ReDoS) attacks via catastrophic backtracking
 * - Resource exhaustion from processing very long patterns
 *
 * @param input - Raw user input (e.g., search term, filter value)
 * @returns Escaped string safe for use in `$regex`, or empty string if exceeds max length
 *
 * @example
 * ```ts
 * const query = { name: { $regex: escapeRegexChars(req.query.search), $options: 'i' } }
 * ```
 */
export function escapeRegexChars(input: string | undefined | null): string {
  if (!input) return ""

  // Enforce max 256 chars to prevent resource exhaustion
  const maxLength = 256
  if (input.length > maxLength) {
    return ""
  }

  // Escape all regex metacharacters: . * + ? ^ $ { } ( ) [ ] | \
  return input.replace(/[.*+?^${}()\[\]|\\]/g, "\\$&")
}

/**
 * Validate search input before sanitization.
 * Returns error message if input fails validation, null if valid.
 *
 * @param input - User input to validate
 * @returns Error message or null if valid
 */
export function validateSearchInput(input: string | undefined | null): string | null {
  if (!input) return null

  // Trim and check for empty after trimming
  const trimmed = (input as string).trim()
  if (!trimmed) return "Search term cannot be empty"

  // Max length check
  if (trimmed.length > 256) return "Search term is too long (max 256 characters)"

  // Check for suspicious patterns that suggest ReDoS attempts
  if (/((\w+\+){5,}|(\w+\*){5,}|\(\w+\|){5,})/.test(trimmed)) {
    return "Invalid search pattern"
  }

  return null
}
