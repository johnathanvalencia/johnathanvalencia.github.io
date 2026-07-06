'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

interface LandingProps {
  onStart: () => void
  reducedMotion?: boolean
}

export default function Landing({ onStart, reducedMotion = false }: LandingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const reelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({ delay: 0.2 })
    const duration = reducedMotion ? 0.1 : 0.8
    const stagger = reducedMotion ? 0.05 : 0.15

    gsap.set([titleRef.current, subtitleRef.current, bodyRef.current, ctaRef.current], {
      opacity: 0,
      y: reducedMotion ? 0 : 30
    })

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration,
      ease: 'power3.out'
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration,
      ease: 'power3.out'
    }, `-=${duration - stagger}`)
    .to(bodyRef.current, {
      opacity: 1,
      y: 0,
      duration,
      ease: 'power3.out'
    }, `-=${duration - stagger}`)
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration,
      ease: 'power3.out'
    }, `-=${duration - stagger}`)

    if (!reducedMotion && reelsRef.current) {
      gsap.to(reelsRef.current.querySelectorAll('.reel-symbol'), {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        stagger: 0.2,
        repeat: -1,
        yoyo: true
      })
    }
  }, [reducedMotion])

  const handleStart = useCallback(() => {
    if (!reducedMotion && reelsRef.current) {
      const symbols = reelsRef.current.querySelectorAll('.reel-symbol')
      gsap.timeline()
        .to(symbols, {
          y: -60,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.in'
        })
        .to(symbols, {
          y: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: 'bounce.out',
          onComplete: onStart
        })
    } else {
      onStart()
    }
  }, [onStart, reducedMotion])

  return (
    <div 
      ref={containerRef}
      className="flex-1 flex flex-col items-center justify-center px-6 py-12 sm:px-8"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div 
          ref={reelsRef}
          className="flex items-center justify-center gap-3 mb-8"
          aria-hidden="true"
        >
          {['◆', '●', '★'].map((symbol, i) => (
            <div
              key={i}
              className="reel-symbol w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-arcade-elevated border border-arcade-border rounded-lg text-arcade-accent text-lg sm:text-xl"
            >
              {symbol}
            </div>
          ))}
        </div>

        <h1 
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-arcade-text mb-4 tracking-tight"
        >
          Johnathan Valencia
          <span className="block text-arcade-accent mt-1">Value Arcade</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg sm:text-xl text-arcade-text/80 mb-6 font-medium"
        >
          A 2-minute interactive proof of how I create leverage.
        </p>

        <p 
          ref={bodyRef}
          className="text-arcade-muted text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
        >
          Three quick games. Each win reveals exactly how I&apos;d drive impact at Punt.
        </p>

        <div ref={ctaRef} className="space-y-4">
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-arcade-bg bg-arcade-accent rounded-xl overflow-hidden transition-all duration-300 hover:bg-arcade-accentGlow focus:outline-none focus:ring-2 focus:ring-arcade-accent focus:ring-offset-2 focus:ring-offset-arcade-bg"
          >
            <span className="relative z-10 flex items-center gap-2">
              Press Start
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
            <a
              href="/creative/JohnathanValencia-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-arcade-muted hover:text-arcade-text transition-colors duration-200 text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Resume (PDF)
            </a>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-arcade-muted hover:text-arcade-text transition-colors duration-200 text-sm font-medium flex items-center gap-2"
            >
              Skip → Book a Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-arcade-muted/50 text-xs font-mono">
        ↓ scroll or tap to continue
      </div>
    </div>
  )
}
