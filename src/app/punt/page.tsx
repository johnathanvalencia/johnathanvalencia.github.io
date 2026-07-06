'use client'

import { useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import Landing from './components/Landing'
import SignalFinder from './components/SignalFinder'
import LeverageBuilder from './components/LeverageBuilder'
import Vault from './components/Vault'

type GameState = 'landing' | 'game1' | 'game2' | 'game3'

const trackEvent = (event: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    console.log('[Analytics]', event, data)
  }
}

export default function PuntPage() {
  const [gameState, setGameState] = useState<GameState>('landing')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const animateTo = useCallback((nextState: GameState) => {
    trackEvent('state_transition', { from: gameState, to: nextState })
    
    const duration = prefersReducedMotion ? 0.1 : 0.5
    const tl = gsap.timeline()
    
    tl.to('.screen-container', {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -20,
      duration,
      ease: 'power2.in',
      onComplete: () => {
        setGameState(nextState)
      }
    })
    
    tl.fromTo('.screen-container', 
      { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
      { opacity: 1, y: 0, duration, ease: 'power2.out' }
    )
  }, [gameState, prefersReducedMotion])

  const handleStart = useCallback(() => {
    trackEvent('game_started')
    animateTo('game1')
  }, [animateTo])

  const handleGame1Complete = useCallback(() => {
    trackEvent('game1_complete')
    animateTo('game2')
  }, [animateTo])

  const handleGame2Complete = useCallback(() => {
    trackEvent('game2_complete')
    animateTo('game3')
  }, [animateTo])

  return (
    <main className="min-h-screen flex flex-col">
      <div className="screen-container flex-1 flex flex-col">
        {gameState === 'landing' && (
          <Landing 
            onStart={handleStart}
            reducedMotion={prefersReducedMotion}
          />
        )}
        {gameState === 'game1' && (
          <SignalFinder 
            onComplete={handleGame1Complete}
            reducedMotion={prefersReducedMotion}
          />
        )}
        {gameState === 'game2' && (
          <LeverageBuilder 
            onComplete={handleGame2Complete}
            reducedMotion={prefersReducedMotion}
          />
        )}
        {gameState === 'game3' && (
          <Vault 
            reducedMotion={prefersReducedMotion}
          />
        )}
      </div>
    </main>
  )
}
