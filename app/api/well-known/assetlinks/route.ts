// Served at /.well-known/assetlinks.json (see rewrites in next.config.mjs).
// Configure via env vars once the Median Android app is created:
//   ANDROID_PACKAGE_NAME          e.g. co.median.android.abcxyz
//   ANDROID_SHA256_FINGERPRINTS   comma-separated, from Play Console > App integrity > App signing
export const dynamic = "force-static"

export function GET() {
  const packageName = process.env.ANDROID_PACKAGE_NAME
  const fingerprints = (process.env.ANDROID_SHA256_FINGERPRINTS || "")
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean)

  const body =
    packageName && fingerprints.length
      ? [
          {
            relation: ["delegate_permission/common.handle_all_urls"],
            target: {
              namespace: "android_app",
              package_name: packageName,
              sha256_cert_fingerprints: fingerprints,
            },
          },
        ]
      : []

  return Response.json(body, {
    headers: { "Cache-Control": "public, max-age=3600" },
  })
}
