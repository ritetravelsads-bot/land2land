"use client"

import { useState } from "react"
import Image from "next/image"
import { PlayCircle } from "lucide-react"

/**
 * Lightweight YouTube embed facade.
 *
 * Renders only a thumbnail image + play button on initial load instead of a live
 * <iframe>, which avoids downloading YouTube's ~1MB+ JS bundle (base.js, etc.)
 * and the "forced reflow" it triggers on every page load. The real iframe is
 * only mounted after the user explicitly clicks play.
 */
export default function YouTubeFacade({
  videoId,
  title,
  className,
}: {
  videoId: string
  title: string
  className?: string
}) {
  const [play, setPlay] = useState(false)

  if (play) {
    return (
      <div className={className}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      aria-label={`Play video: ${title}`}
      className={className}
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        loading="lazy"
        sizes="(max-width: 1023px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors flex items-center justify-center">
        <PlayCircle
          className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-lg group-hover:scale-110 transition-transform"
          strokeWidth={1.5}
        />
      </div>
    </button>
  )
}
