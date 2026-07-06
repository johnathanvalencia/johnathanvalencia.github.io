'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import ProgressHeader from './ProgressHeader'

interface LeverageBuilderProps {
  onComplete: () => void
  reducedMotion?: boolean
}

const SLOTS = [
  { id: 'product', label: 'Product', subtitle: 'make it obvious' },
  { id: 'distribution', label: 'Distribution', subtitle: 'make it spread' },
  { id: 'retention', label: 'Retention', subtitle: 'make it stick' }
]

const TILES = [
  { id: 'onboarding', label: 'Onboarding: shorten time-to-value' },
  { id: 'personalization', label: 'Personalization: increase relevance' },
  { id: 'pricing', label: 'Pricing test: unlock revenue' },
  { id: 'referral', label: 'Referral loop: organic growth' },
  { id: 'lifecycle', label: 'Lifecycle nudges: repeat behavior' }
]

const REVEALS = {
  product: {
    title: 'Leverage Added',
    body: 'This is where I\'d focus first because it compounds over time.',
    punt: 'I\'d ship this in an MVP sprint, then iterate weekly with clean metrics.'
  },
  distribution: {
    title: 'Leverage Added',
    body: 'This is where I\'d focus first because it compounds over time.',
    punt: 'I\'d ship this in an MVP sprint, then iterate weekly with clean metrics.'
  },
  retention: {
    title: 'Leverage Added',
    body: 'This is where I\'d focus first because it compounds over time.',
    punt: 'I\'d ship this in an MVP sprint, then iterate weekly with clean metrics.'
  }
}

export default function LeverageBuilder({ onComplete, reducedMotion = false }: LeverageBuilderProps) {
  const [placements, setPlacements] = useState<Record<string, string>>({})
  const [selectedTile, setSelectedTile] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [latestPlacement, setLatestPlacement] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const machineRef = useRef<HTMLDivElement>(null)

  const filledSlots = Object.keys(placements).length

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        if (!reducedMotion) {
          gsap.to('.intro-overlay', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => setShowIntro(false)
          })
        } else {
          setShowIntro(false)
        }
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [showIntro, reducedMotion])

  useEffect(() => {
    if (filledSlots === 3 && !isComplete) {
      if (!reducedMotion && machineRef.current) {
        gsap.timeline()
          .to(machineRef.current, { scale: 1.02, duration: 0.3, ease: 'power2.inOut' })
          .to(machineRef.current, { scale: 1, duration: 0.3, ease: 'power2.inOut' })
        gsap.to('.slot-filled', {
          boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
          duration: 0.8,
          ease: 'power2.out'
        })
      }
      setTimeout(() => setIsComplete(true), 1500)
    }
  }, [filledSlots, isComplete, reducedMotion])

  const handleTileClick = useCallback((tileId: string) => {
    if (Object.values(placements).includes(tileId)) return
    setSelectedTile(selectedTile === tileId ? null : tileId)
  }, [placements, selectedTile])

  const handleSlotClick = useCallback((slotId: string) => {
    if (!selectedTile || placements[slotId]) return

    setPlacements(prev => ({ ...prev, [slotId]: selectedTile }))
    setLatestPlacement(slotId)
    setSelectedTile(null)

    if (!reducedMotion) {
      gsap.fromTo(`#slot-${slotId}`,
        { scale: 0.9 },
        { scale: 1, duration: 0.3, ease: 'back.out(2)' }
      )
    }

    setTimeout(() => setLatestPlacement(null), 2000)
  }, [selectedTile, placements, reducedMotion])

  const getTileLabel = (tileId: string) => {
    return TILES.find(t => t.id === tileId)?.label || ''
  }

  if (isComplete) {
    return (
      <div className="flex-1 flex flex-col">
        <ProgressHeader currentGame={2} title="Leverage Builder" />
        
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-arcade-accent to-arcade-accentGlow flex items-center justify-center animate-glow">
              <svg className="w-10 h-10 text-arcade-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-arcade-text mb-4">
              Compounding Machine Built
            </h2>
            <p className="text-arcade-muted text-lg mb-8 max-w-md mx-auto">
              Fast iteration + measurable lift + systems that scale.
            </p>
            
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-arcade-bg bg-arcade-accent rounded-xl hover:bg-arcade-accentGlow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-arcade-accent focus:ring-offset-2 focus:ring-offset-arcade-bg"
            >
              Continue → Game 3
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col relative">
      {showIntro && (
        <div className="intro-overlay absolute inset-0 z-50 bg-arcade-bg/95 flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <p className="text-xl sm:text-2xl text-arcade-text font-medium leading-relaxed">
              Leverage isn&apos;t hustle. It&apos;s building the machine that compounds.
            </p>
          </div>
        </div>
      )}

      <ProgressHeader currentGame={2} title="Leverage Builder" />
      
      <div ref={containerRef} className="flex-1 flex flex-col gap-6 px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto w-full">
        <div ref={machineRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SLOTS.map((slot) => {
            const placedTile = placements[slot.id]
            const reveal = latestPlacement === slot.id ? REVEALS[slot.id as keyof typeof REVEALS] : null
            
            return (
              <div key={slot.id} className="flex flex-col gap-3">
                <button
                  id={`slot-${slot.id}`}
                  onClick={() => handleSlotClick(slot.id)}
                  disabled={!!placedTile}
                  className={`
                    relative min-h-[120px] rounded-xl border-2 border-dashed p-4 transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-arcade-accent focus:ring-offset-2 focus:ring-offset-arcade-bg
                    ${placedTile 
                      ? 'slot-filled bg-arcade-accent/10 border-arcade-accent cursor-default' 
                      : selectedTile
                        ? 'border-arcade-accent bg-arcade-accent/5 cursor-pointer hover:bg-arcade-accent/10'
                        : 'border-arcade-border bg-arcade-surface cursor-default'
                    }
                  `}
                  aria-label={`${slot.label} slot${placedTile ? `: ${getTileLabel(placedTile)}` : ''}`}
                >
                  <div className="text-center">
                    <div className="text-arcade-accent font-semibold text-sm mb-1">
                      {slot.label}
                    </div>
                    <div className="text-arcade-muted text-xs">
                      {slot.subtitle}
                    </div>
                  </div>
                  
                  {placedTile && (
                    <div className="mt-3 pt-3 border-t border-arcade-border">
                      <p className="text-arcade-text text-sm font-medium">
                        {getTileLabel(placedTile)}
                      </p>
                    </div>
                  )}
                  
                  {!placedTile && selectedTile && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-arcade-accent text-xs font-mono animate-pulse">
                        tap to place
                      </span>
                    </div>
                  )}
                </button>

                {reveal && (
                  <div className="bg-arcade-elevated border border-arcade-border rounded-lg p-4 fade-in-up">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-arcade-success mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="text-arcade-success font-semibold text-sm">{reveal.title}</h4>
                        <p className="text-arcade-text/80 text-xs mt-1">{reveal.body}</p>
                        <p className="text-arcade-muted text-xs mt-2 font-mono">{reveal.punt}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-4">
          <div className="text-arcade-muted text-sm mb-3 font-medium">
            Tiles ({5 - Object.values(placements).length} remaining)
          </div>
          <div className="flex flex-wrap gap-3">
            {TILES.map((tile) => {
              const isPlaced = Object.values(placements).includes(tile.id)
              const isSelected = selectedTile === tile.id
              
              return (
                <button
                  key={tile.id}
                  onClick={() => handleTileClick(tile.id)}
                  disabled={isPlaced}
                  className={`
                    px-4 py-3 rounded-lg border text-left text-sm transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-arcade-accent focus:ring-offset-2 focus:ring-offset-arcade-bg
                    ${isPlaced 
                      ? 'opacity-30 cursor-not-allowed bg-arcade-surface border-arcade-border line-through' 
                      : isSelected
                        ? 'bg-arcade-accent/20 border-arcade-accent text-arcade-text scale-105'
                        : 'bg-arcade-surface border-arcade-border text-arcade-text/80 hover:border-arcade-accent/50 cursor-pointer'
                    }
                  `}
                  aria-pressed={isSelected}
                >
                  {tile.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="text-center text-arcade-muted text-sm mt-4">
          {selectedTile ? 'Now tap a slot to place the tile' : 'Tap a tile, then tap a slot to place it'}
        </div>
      </div>
    </div>
  )
}
