const MEDIAN_USER_AGENT_PATTERN = /median|gonative/i

export function isMedianUserAgent(userAgent: string | null | undefined): boolean {
  return typeof userAgent === "string" && MEDIAN_USER_AGENT_PATTERN.test(userAgent)
}
