"use client"

import Script from "next/script"
import { useAppPlatform } from "@/lib/median"

// Web push only runs in regular browsers. Inside the Median iOS/Android app,
// push is handled natively by Median's OneSignal plugin (see median-bridge.tsx),
// and loading the web SDK there would fail or create duplicate subscriptions.
export default function OneSignalWebPush() {
  const platform = useAppPlatform()
  if (platform !== "web") return null

  return (
    <>
      <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" strategy="afterInteractive" />
      <Script
        id="onesignal-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(async function(OneSignal) {
              await OneSignal.init({
                appId: "00bf76a8-4e68-4ede-9465-b00bbfa0c3fc",
                safari_web_id: "web.onesignal.auto.6b1e0125-c07a-4d4d-8123-db80df1063df",
                notifyButton: { enable: true },
              });
            });
          `,
        }}
      />
    </>
  )
}
