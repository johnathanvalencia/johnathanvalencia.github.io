'use client'

interface ProgressHeaderProps {
  currentGame: number
  totalGames?: number
  title: string
}

export default function ProgressHeader({ 
  currentGame, 
  totalGames = 3, 
  title 
}: ProgressHeaderProps) {
  return (
    <div 
      className="w-full px-4 py-6 sm:px-8 sm:py-8"
      style={{ position: 'relative', zIndex: 'auto' }}
      role="banner"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-arcade-muted text-sm font-mono">
            Game {currentGame} of {totalGames}
          </span>
          <span className="text-arcade-accent font-medium text-sm sm:text-base">
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-2" role="progressbar" aria-valuenow={currentGame} aria-valuemin={1} aria-valuemax={totalGames}>
          {Array.from({ length: totalGames }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < currentGame 
                  ? 'bg-arcade-accent' 
                  : 'bg-arcade-border'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
