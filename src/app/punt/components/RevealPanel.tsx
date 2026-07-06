'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface RevealPanelProps {
  title: string
  subtitle: string
  body: string
  hint?: string
  visible: boolean
  reducedMotion?: boolean
}

export default function RevealPanel({
  title,
  subtitle,
  body,
  hint,
  visible,
  reducedMotion = false
}: RevealPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!panelRef.current) return

    if (visible) {
      gsap.fromTo(panelRef.current,
        { 
          opacity: 0, 
          x: reducedMotion ? 0 : 30,
          scale: reducedMotion ? 1 : 0.95
        },
        { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          duration: reducedMotion ? 0.1 : 0.5,
          ease: 'power3.out'
        }
      )
    } else {
      gsap.set(panelRef.current, { opacity: 0 })
    }
  }, [visible, reducedMotion])

  return (
    <div 
      ref={panelRef}
      className={`bg-arcade-elevated border border-arcade-border rounded-xl p-5 sm:p-6 ${
        visible ? 'block' : 'hidden'
      }`}
      role="region"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-2 h-2 rounded-full bg-arcade-accent mt-2 flex-shrink-0 animate-pulse" />
        <div>
          <h3 className="text-arcade-accent font-semibold text-base sm:text-lg">
            {title}
          </h3>
          <p className="text-arcade-text/80 text-sm mt-1">
            {subtitle}
          </p>
        </div>
      </div>
      
      <p className="text-arcade-text text-sm sm:text-base leading-relaxed pl-5">
        {body}
      </p>
      
      {hint && (
        <p className="text-arcade-muted text-xs sm:text-sm mt-4 pl-5 font-mono">
          {hint}
        </p>
      )}
    </div>
  )
}
