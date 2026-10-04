'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = {
  images: string[]
  alt: string
}

export function CarGallery({ images, alt }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) return null

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-theme-lg border border-theme bg-black/5">
        <Image
          src={images[activeIndex]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`relative aspect-[4/3] overflow-hidden rounded-theme-md border-2 transition-all ${
                activeIndex === i
                  ? 'border-accent opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${alt} - foto ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}