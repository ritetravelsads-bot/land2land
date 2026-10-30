// Served at /.well-known/apple-app-site-association (see rewrites in next.config.mjs).
// Configure via env vars once the Median iOS app is created:
//   APPLE_TEAM_ID     e.g. ABCDE12345 (Apple Developer > Membership)
//   IOS_BUNDLE_ID     e.g. co.median.ios.abcxyz
export const dynamic = "force-static"

export function GET() {
  const teamId = process.env.APPLE_TEAM_ID
  const bundleId = process.env.IOS_BUNDLE_ID
  const appIds = teamId && bundleId ? [`${teamId}.${bundleId}`] : []

  const body = {
    applinks: {
      details: appIds.length
        ? [
            {
              appIDs: appIds,
              components: [
                { "/": "/admin*", exclude: true },
                { "/": "/api/*", exclude: true },
                { "/": "/*" },
              ],
            },
          ]
        : [],
    },
    webcredentials: { apps: appIds },
  }

  return Response.json(body, {
    headers: { "Cache-Control": "public, max-age=3600" },
  })
}
