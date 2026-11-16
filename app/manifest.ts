import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Land2Land | Buy & Sell All Types of Land",
    short_name: "Land2Land",
    description:
      "Buy, sell, and invest in agricultural, residential, commercial, industrial and farmland across India.",
    // Canonical id must be the full origin, not just "/" — required for
    // Play Store's "Trusted Web Activity" identity check.
    id: "https://land2land.com/",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#125007",
    lang: "en",
    dir: "ltr",
    categories: ["business", "shopping", "lifestyle"],
    // Icons: keep "any" and "maskable" in separate entries.
    // Maskable icons must have at least 10% safe-zone padding around the logo.
    // Both the 192 and 512 PNG files exist in /public/icons/.
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    // App shortcuts surface on long-press of the app icon (Android) and
    // are a positive signal in the Play Store quality review.
    shortcuts: [
      {
        name: "Browse Properties",
        short_name: "Properties",
        description: "Search and filter land listings",
        url: "/properties?source=shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Post a Property",
        short_name: "Post",
        description: "List your land for sale",
        url: "/post-property?source=shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "My Account",
        short_name: "Account",
        description: "View your dashboard and saved listings",
        url: "/auth/login?source=shortcut",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
    // Screenshots help the Play Store listing and are required for the
    // enhanced install prompt on Chrome Android.
    screenshots: [
      {
        src: "/og-image.png",
        sizes: "1200x630",
        type: "image/png",
        // @ts-expect-error — form_factor is a valid W3C field not yet in TS types
        form_factor: "wide",
        label: "Land2Land homepage — browse and invest in land",
      },
    ],
  }
}
