'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import ProgressHeader from './ProgressHeader'
import ChoiceCard from './ChoiceCard'
import RevealPanel from './RevealPanel'

interface SignalFinderProps {
  onComplete: () => void
  reducedMotion?: boolean
}

const ROUNDS = [
  {
    prompt: 'Pick one. I\'ll show you how I decide.',
    options: ['Retention curve shift', 'Activation drop-off', 'Conversion spike'],
    reveals: {
      'Retention curve shift': {
        title: 'Signal: Retention curve shift',
        subtitle: 'This tells me where leverage actually lives.',
        body: 'At Punt, I\'d run this as a 48-hour diagnostic → isolate top 1–2 bottlenecks.',
        hint: 'I prioritize by impact × speed × confidence.'
      },
      'Activation drop-off': {
        title: 'Signal: Activation drop-off',
        subtitle: 'This tells me where leverage actually lives.',
        body: 'At Punt, I\'d run this as a 48-hour diagnostic → isolate top 1–2 bottlenecks.',
        hint: 'I prioritize by impact × speed × confidence.'
      },
      'Conversion spike': {
        title: 'Signal: Conversion spike',
        subtitle: 'This tells me where leverage actually lives.',
        body: 'At Punt, I\'d run this as a 48-hour diagnostic → isolate top 1–2 bottlenecks.',
        hint: 'I prioritize by impact × speed × confidence.'
      }
    }
  },
  {
    prompt: 'Now, choose your response.',
    options: ['Ship a guided flow', 'Run a cohort split', 'Add a friction kill-switch'],
    reveals: {
      'Ship a guided flow': {
        title: 'Signal: Ship a guided flow',
        subtitle: 'This tells me where leverage actually lives.',
        body: 'At Punt, I\'d run this as a 48-hour diagnostic → isolate top 1–2 bottlenecks.',
        hint: 'I prioritize by impact × speed × confidence.'
      },
      'Run a cohort split': {
        title: 'Signal: Run a cohort split',
        subtitle: 'This tells me where leverage actually lives.',
        body: 'At Punt, I\'d run this as a 48-hour diagnostic → isolate top 1–2 bottlenecks.',
        hint: 'I prioritize by impact × speed × confidence.'
      },
      'Add a friction kill-switch': {
        title: 'Signal: Add a friction kill-switch',
        subtitle: 'This tells me where leverage actually lives.',
        body: 'At Punt, I\'d run this as a 48-hour diagnostic → isolate top 1–2 bottlenecks.',
        hint: 'I prioritize by impact × speed × confidence.'
      }
    }
  },
  {
    prompt: 'Finally, what do you measure?',
    options: ['Time-to-value', 'Repeat behavior', 'Net revenue per user'],
    reveals: {
      'Time-to-value': {
        title: 'Signal: Time-to-value',
        subtitle: 'This tells me where leverage actually lives.',
        body: 'At Punt, I\'d run this as a 48-hour diagnostic → isolate top 1–2 bottlenecks.',
        hint: 'I prioritize by impact × speed × confidence.'
      },
      'Repeat behavior': {
        title: 'Signal: Repeat behavior',
        subtitle: 'This tells me where leverage actually lives.',
        body: 'At Punt, I\'d run this as a 48-hour diagnostic → isolate top 1–2 bottlenecks.',
        hint: 'I prioritize by impact × speed × confidence.'
      },
      'Net revenue per user': {
        title: 'Signal: Net revenue per user',
        subtitle: 'This tells me where leverage actually lives.',
        body: 'At Punt, I\'d run this as a 48-hour diagnostic → isolate top 1–2 bottlenecks.',
        hint: 'I prioritize by impact × speed × confidence.'
      }
    }
  }
]

export default function SignalFinder({ onComplete, reducedMotion = false }: SignalFinderProps) {
  const [currentRound, setCurrentRound] = useState(0)
  const [selections, setSelections] = useState<string[]>([])
  const [showReveal, setShowReveal] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  const cardsRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!cardsRef.current || !promptRef.current) return

    const duration = reducedMotion ? 0.1 : 0.5
    
    gsap.fromTo(promptRef.current,
      { opacity: 0, y: reducedMotion ? 0 : -10 },
      { opacity: 1, y: 0, duration, ease: 'power2.out' }
    )

    gsap.fromTo(cardsRef.current.children,
      { opacity: 0, y: reducedMotion ? 0 : 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration,
        stagger: reducedMotion ? 0.05 : 0.1,
        ease: 'power2.out'
      }
    )
  }, [currentRound, reducedMotion])

  const handleSelect = useCallback((option: string) => {
    if (selections[currentRound]) return

    const newSelections = [...selections]
    newSelections[currentRound] = option
    setSelections(newSelections)
    setShowReveal(true)

    if (!reducedMotion) {
      gsap.to(cardsRef.current, {
        keyframes: [
          { x: -5 },
          { x: 5 },
          { x: -3 },
          { x: 3 },
          { x: 0 },
        ],
        duration: 0.4,
        ease: 'power2.out'
      })
    }
  }, [currentRound, selections, reducedMotion])

  const handleContinue = useCallback(() => {
    if (currentRound < ROUNDS.length - 1) {
      setShowReveal(false)
      
      const duration = reducedMotion ? 0.1 : 0.3
      
      gsap.to([cardsRef.current, promptRef.current], {
        opacity: 0,
        x: reducedMotion ? 0 : -30,
        duration,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentRound(prev => prev + 1)
          gsap.set([cardsRef.current, promptRef.current], { x: 0 })
        }
      })
    } else {
      setIsComplete(true)
    }
  }, [currentRound, reducedMotion])

  const round = ROUNDS[currentRound]
  const currentSelection = selections[currentRound]
  const revealData = currentSelection ? round.reveals[currentSelection as keyof typeof round.reveals] : null

  if (isComplete) {
    return (
      <div className="flex-1 flex flex-col">
        <ProgressHeader currentGame={1} title="Signal Finder" />
        
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-arcade-accent/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-arcade-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-arcade-text mb-4">
              Signal found.
            </h2>
            <p className="text-arcade-muted text-lg mb-8">
              Next: building leverage.
            </p>
            
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-arcade-bg bg-arcade-accent rounded-xl hover:bg-arcade-accentGlow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-arcade-accent focus:ring-offset-2 focus:ring-offset-arcade-bg"
            >
              Continue → Game 2
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
    <div className="flex-1 flex flex-col">
      <ProgressHeader currentGame={1} title="Signal Finder" />
      
      <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto w-full">
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-arcade-muted text-sm font-mono mb-3">
              Round {currentRound + 1} of {ROUNDS.length}
            </div>
            <p 
              ref={promptRef}
              className="text-xl sm:text-2xl font-semibold text-arcade-text"
            >
              {round.prompt}
            </p>
          </div>

          <div ref={cardsRef} className="space-y-3 flex-1">
            {round.options.map((option) => (
              <ChoiceCard
                key={option}
                label={option}
                selected={currentSelection === option}
                disabled={!!currentSelection && currentSelection !== option}
                onClick={() => handleSelect(option)}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          {showReveal && (
            <button
              onClick={handleContinue}
              className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-arcade-text bg-arcade-surface border border-arcade-border rounded-xl hover:border-arcade-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-arcade-accent focus:ring-offset-2 focus:ring-offset-arcade-bg"
            >
              {currentRound < ROUNDS.length - 1 ? 'Next Round' : 'Complete Game 1'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          {revealData && (
            <RevealPanel
              title={revealData.title}
              subtitle={revealData.subtitle}
              body={revealData.body}
              hint={revealData.hint}
              visible={showReveal}
              reducedMotion={reducedMotion}
            />
          )}
        </div>
      </div>
    </div>
  )
}
