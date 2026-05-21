import { useState, useEffect, useCallback, useRef } from 'react'
import WatchFrame from './components/WatchFrame'
import TimeDisplay from './components/TimeDisplay'
import StopwatchWidget from './components/StopwatchWidget'
import StatRing from './components/StatRing'
import ModeToggle from './components/ModeToggle'

function formatTime(ms) {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  const milli = Math.floor((ms % 1000) / 10)
  return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(milli).padStart(2,'0')}`
}

function App() {
  // ← two refs: one for the interval ID, one for the true elapsed value
  const intervalRef = useRef(null)
  const elapsedRef = useRef(0)

  const [currentMode, setCurrentMode] = useState('clock')
  const [time, setTime] = useState(new Date())
  const [displayedElapsed, setDisplayedElapsed] = useState(0)  // ← only for display
  const [isRunning, setIsRunning] = useState(false)
  const [lapTimes, setLapTimes] = useState([])
  const [isPulsing, setIsPulsing] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [stats, setStats] = useState({
    steps: 8432,
    calories: 420,
    heartRate: 72,
  })

  // ← handleStart stores interval ID in ref, ticks via elapsedRef
  const handleStart = useCallback(() => {
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      elapsedRef.current += 100
      setDisplayedElapsed(elapsedRef.current)
    }, 100)
  }, [])

  // ← handleStop clears the interval via ref
  const handleStop = useCallback(() => {
    setIsRunning(false)
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  // ← handleReset clears both refs and resets display state
  const handleReset = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    elapsedRef.current = 0
    setDisplayedElapsed(0)
    setIsRunning(false)
    setLapTimes([])
  }, [])

  // ← handleLap reads from elapsedRef directly, no dependency needed
  const handleLap = useCallback(() => {
    setLapTimes(prev => [...prev, formatTime(elapsedRef.current)])
  }, [])

  const handleSyncStats = () => {
    setIsAnimating(true)
    setStats({
      steps:     Math.floor(Math.random() * 7001) + 5000,
      calories:  Math.floor(Math.random() * 601)  + 200,
      heartRate: Math.floor(Math.random() * 53)   + 58,
    })
    setTimeout(() => setIsAnimating(false), 300)
  }

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // ← old stopwatch useEffect removed — interval is now managed in handleStart/handleStop

  useEffect(() => {
    const id = setInterval(() => {
      const delta = Math.floor(Math.random() * 10) - 5
      setStats(prev => ({ ...prev, heartRate: prev.heartRate + delta }))
      setIsPulsing(true)
      setTimeout(() => setIsPulsing(false), 600)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <WatchFrame>
        {currentMode === 'stopwatch' && (
          <StopwatchWidget
            currentTime={formatTime(displayedElapsed)}
            isRunning={isRunning}
            lapTimes={lapTimes}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
            onLap={handleLap}
          />
        )}

        {currentMode === 'clock' && (
          <TimeDisplay
            hours={time.getHours() % 12 || 12}
            minutes={String(time.getMinutes()).padStart(2, '0')}
            seconds={String(time.getSeconds()).padStart(2, '0')}
            format="12"
          />
        )}

        <div className="flex gap-4">
          <StatRing label="Steps" value={stats.steps} target="10,000" color="border-green-500" isAnimating={isAnimating} />
          <StatRing label="Cal" value={stats.calories} target="600" color="border-orange-500" isAnimating={isAnimating} />
          <StatRing label="BPM" value={stats.heartRate} target="120" color="border-red-500" isPulsing={isPulsing} isAnimating={isAnimating} />
        </div>

        <div className="flex gap-2 items-center justify-center">
          <ModeToggle currentMode={currentMode} onModeChange={setCurrentMode} />
          <button
            onClick={handleSyncStats}
            className="bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all duration-150 text-white text-xs font-medium px-3 py-1.5 rounded-full"
          >
            ↺ Sync Stats
          </button>
        </div>
      </WatchFrame>
    </div>
  )
}
export default App