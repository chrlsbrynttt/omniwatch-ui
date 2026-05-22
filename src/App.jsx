import { useState, useEffect } from 'react'
import WatchFrame from './components/WatchFrame'
import TimeDisplay from './components/TimeDisplay'
import StopwatchWidget from './components/StopwatchWidget'
import StatRing from './components/StatRing'
import ModeToggle from './components/ModeToggle'
import { useStopwatch } from './hooks/useStopwatch'
import { useStats } from './hooks/useStats'
import { useWatch } from './context/WatchContext'

const defaultStats = {
  steps: 8432,
  calories: 420,
  heartRate: 72,
}

function formatTime(ms) {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  const milli = Math.floor((ms % 1000) / 10)
  return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(milli).padStart(2,'0')}`
}

function App() {
  const { timeFormat } = useWatch()
  const { elapsed, isRunning, lapTimes, start, stop, reset, lap } = useStopwatch()
  const { stats, isSyncing, syncError, syncStats } = useStats(defaultStats)

  const [currentMode, setCurrentMode] = useState('clock')
  const [time, setTime] = useState(new Date())
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
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
            currentTime={formatTime(elapsed)}
            isRunning={isRunning}
            lapTimes={lapTimes}
            onStart={start}
            onStop={stop}
            onReset={reset}
            onLap={lap}
          />
        )}

        {currentMode === 'clock' && (
          <TimeDisplay
            hours={time.getHours() % 12 || 12}
            minutes={String(time.getMinutes()).padStart(2, '0')}
            seconds={String(time.getSeconds()).padStart(2, '0')}
            format={timeFormat}
          />
        )}

        <div className="flex gap-4">
          <StatRing label="Steps" value={stats.steps} target="10,000" color="border-green-500" isAnimating={isSyncing} />
          <StatRing label="Cal" value={stats.calories} target="600" color="border-orange-500" isAnimating={isSyncing} />
          <StatRing label="BPM" value={stats.heartRate} target="120" color="border-red-500" isPulsing={isPulsing} isAnimating={isSyncing} />
        </div>

        <div className="flex gap-2 items-center justify-center">
          <ModeToggle currentMode={currentMode} onModeChange={setCurrentMode} />
          <button
            onClick={syncStats}
            disabled={isSyncing}
            className="bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all duration-150 text-white text-xs font-medium px-3 py-1.5 rounded-full disabled:opacity-50"
          >
            {syncError ? '✕ Failed' : isSyncing ? '⟳ Syncing...' : '↺ Sync Stats'}
          </button>
        </div>
      </WatchFrame>
    </div>
  )
}
export default App