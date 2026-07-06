'use client'

import { useRef, useCallback } from 'react'
import gsap from 'gsap'

interface ChoiceCardProps {
  label: string
  selected: boolean
  disabled: boolean
  onClick: () => void
  reducedMotion?: boolean
}

export default function ChoiceCard({
  label,
  selected,
  disabled,
  onClick,
  reducedMotion = false
}: ChoiceCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null)

  const handleMouseEnter = useCallback(() => {
    if (disabled || selected || reducedMotion) return
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out'
    })
  }, [disabled, selected, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    if (disabled || selected || reducedMotion) return
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }, [disabled, selected, reducedMotion])

  const handleClick = useCallback(() => {
    if (disabled) return
    
    if (!reducedMotion && cardRef.current) {
      gsap.timeline()
        .to(cardRef.current, {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.in'
        })
        .to(cardRef.current, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        })
        .to(cardRef.current, {
          scale: 1,
          duration: 0.15,
          ease: 'power2.inOut'
        })
    }
    
    onClick()
  }, [disabled, onClick, reducedMotion])

  return (
    <button
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={`
        relative w-full p-4 sm:p-5 rounded-xl border-2 text-left transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-arcade-accent focus:ring-offset-2 focus:ring-offset-arcade-bg
        ${selected 
          ? 'bg-arcade-accent/10 border-arcade-accent shadow-lg shadow-arcade-accent/20' 
          : 'bg-arcade-surface border-arcade-border hover:border-arcade-accent/50'
        }
        ${disabled && !selected ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
      aria-pressed={selected}
    >
      <div className="flex items-center gap-3">
        <div className={`
          w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors duration-200
          ${selected 
            ? 'bg-arcade-accent border-arcade-accent' 
            : 'border-arcade-muted'
          }
        `} />
        <span className={`text-sm sm:text-base font-medium ${
          selected ? 'text-arcade-text' : 'text-arcade-text/80'
        }`}>
          {label}
        </span>
      </div>
      
      {selected && (
        <div className="absolute inset-0 rounded-xl bg-arcade-accent/5 pointer-events-none" />
      )}
    </button>
  )
}
