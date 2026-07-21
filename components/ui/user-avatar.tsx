"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  name?: string | null
  src?: string | null
  className?: string
  /** Tailwind text-size class for the initials fallback, e.g. "text-sm" */
  textClassName?: string
  alt?: string
}

function getInitials(name?: string | null) {
  if (!name) return "U"
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p.charAt(0).toUpperCase()).join("") || "U"
}

/**
 * Displays a user's profile picture with a graceful initials fallback.
 * Falls back to initials when there is no image or the image fails to load.
 * Uses a plain <img> (ImageKit URLs are remote) to avoid next/image domain config.
 */
export function UserAvatar({ name, src, className, textClassName, alt }: UserAvatarProps) {
  const [errored, setErrored] = useState(false)
  const showImage = Boolean(src) && !errored

  return (
    <div
      className={cn(
        "relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-semibold text-primary",
        className,
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src as string}
          alt={alt || `${name || "User"} profile photo`}
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className={cn("select-none", textClassName)}>{getInitials(name)}</span>
      )}
    </div>
  )
}

export default UserAvatar
