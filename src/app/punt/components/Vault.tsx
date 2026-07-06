'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import ProgressHeader from './ProgressHeader'

interface VaultProps {
  reducedMotion?: boolean
}

const PREVIEW_CARDS = [
  { id: 'plan', title: '90-Day Punt Plan' },
  { id: 'week1', title: 'What I\'d Ship Week 1' },
  { id: 'revenue', title: 'How I\'d Drive Revenue' }
]

const TIME_SLOTS = [
  { id: '1', label: 'Tuesday 2:00 PM EST' },
  { id: '2', label: 'Wednesday 10:00 AM EST' },
  { id: '3', label: 'Thursday 3:00 PM EST' }
]

export default function Vault({ reducedMotion = false }: VaultProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const vaultRef = useRef<HTMLDivElement>(null)
  const doorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!vaultRef.current) return

    if (!reducedMotion) {
      gsap.to('.vault-shimmer', {
        backgroundPosition: '200% 0',
        duration: 3,
        ease: 'none',
        repeat: -1
      })

      gsap.fromTo('.keypad-key',
        { opacity: 0.5 },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        }
      )
    }
  }, [reducedMotion])

  const handleUnlock = useCallback(() => {
    if (isUnlocked) return

    if (!reducedMotion && doorRef.current && contentRef.current) {
      const tl = gsap.timeline()
      
      tl.to(doorRef.current, {
        rotateY: -30,
        x: -20,
        opacity: 0.7,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3')
    }

    setIsUnlocked(true)
  }, [isUnlocked, reducedMotion])

  return (
    <div className="flex-1 flex flex-col">
      <ProgressHeader currentGame={3} title="The Vault" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-arcade-text mb-3">
            You&apos;ve seen how I think.
          </h2>
          <p className="text-arcade-accent text-lg sm:text-xl font-medium mb-4">
            The rest is best unlocked in a conversation.
          </p>
          <p className="text-arcade-muted text-base sm:text-lg mb-10 max-w-lg mx-auto">
            I don&apos;t send strategy into the void. If Punt is serious, I&apos;ll walk you through it live.
          </p>

          <div 
            ref={vaultRef}
            className="relative mx-auto mb-10 max-w-md"
          >
            <div 
              ref={doorRef}
              className={`
                relative bg-gradient-to-br from-arcade-elevated to-arcade-surface 
                border-2 border-arcade-border rounded-2xl p-6 sm:p-8
                ${isUnlocked ? 'pointer-events-none' : ''}
              `}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div className="vault-shimmer absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-arcade-accent/10 to-transparent bg-[length:200%_100%] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-arcade-surface border-2 border-arcade-border flex items-center justify-center">
                  <svg className="w-8 h-8 text-arcade-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 max-w-[160px] mx-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((key, i) => (
                    <div
                      key={i}
                      className="keypad-key w-10 h-10 rounded-lg bg-arcade-bg border border-arcade-border flex items-center justify-center text-arcade-muted text-sm font-mono"
                      aria-hidden="true"
                    >
                      {key}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {PREVIEW_CARDS.map((card) => (
                    <div
                      key={card.id}
                      className="w-24 h-16 rounded-lg bg-arcade-bg/50 border border-arcade-border flex items-center justify-center p-2 backdrop-blur-sm"
                    >
                      <span className="text-arcade-text/30 text-xs text-center font-medium blur-[2px]">
                        {card.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div 
              ref={contentRef}
              className={`
                absolute inset-0 bg-arcade-elevated border-2 border-arcade-accent rounded-2xl p-6 sm:p-8
                ${isUnlocked ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              `}
              style={{ transform: isUnlocked && reducedMotion ? 'none' : 'translateY(20px)' }}
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-arcade-accent/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-arcade-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-arcade-text font-semibold text-lg mb-2">
                  Pick a time that works
                </h3>
                <p className="text-arcade-muted text-sm">
                  15 minutes. No prep needed.
                </p>
              </div>

              <div className="space-y-2 mb-6">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedTime(slot.id)}
                    className={`
                      w-full px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-arcade-accent focus:ring-offset-2 focus:ring-offset-arcade-elevated
                      ${selectedTime === slot.id
                        ? 'bg-arcade-accent text-arcade-bg border-arcade-accent'
                        : 'bg-arcade-surface text-arcade-text border-arcade-border hover:border-arcade-accent'
                      }
                    `}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <a
                  href={`https://calendly.com?time=${selectedTime}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 bg-arcade-accent text-arcade-bg rounded-lg text-sm font-semibold text-center hover:bg-arcade-accentGlow transition-colors duration-200"
                >
                  Confirm Booking →
                </a>
              )}

              <div className="mt-4 pt-4 border-t border-arcade-border">
                <a
                  href="mailto:hello@johnathanvalencia.com"
                  className="text-arcade-muted hover:text-arcade-text text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email me instead
                </a>
              </div>
            </div>
          </div>

          {!isUnlocked && (
            <div className="space-y-4">
              <button
                onClick={handleUnlock}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-arcade-bg bg-arcade-accent rounded-xl hover:bg-arcade-accentGlow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-arcade-accent focus:ring-offset-2 focus:ring-offset-arcade-bg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Unlock the Vault → Book a 15-min Call
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
                <a
                  href="mailto:hello@johnathanvalencia.com"
                  className="text-arcade-muted hover:text-arcade-text transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email me instead
                </a>
              </div>

              <p className="text-arcade-muted/60 text-xs mt-4">
                No forms. No spam. Just a conversation.
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="px-6 py-4 text-center">
        <p className="text-arcade-muted/40 text-xs font-mono">
          Built with intention · Johnathan Valencia © 2026
        </p>
      </footer>
    </div>
  )
}
