import { useState, useEffect, useCallback, useRef, useReducer } from 'react'
import WatchFrame from './components/WatchFrame'
import TimeDisplay from './components/TimeDisplay'
import StopwatchWidget from './components/StopwatchWidget'
import StatRing from './components/StatRing'
import ModeToggle from './components/ModeToggle'
import { stopwatchReducer, initialState } from './stopwatchReducer'
import { useWatch } from './context/WatchContext'

function formatTime(ms) {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  const milli = Math.floor((ms % 1000) / 10)
  return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(milli).padStart(2,'0')}`
}

function App() {
  const { timeFormat } = useWatch()
  
  const intervalRef = useRef(null)
  const elapsedRef = useRef(0)

  // ← one useReducer replaces isRunning, elapsed, lapTimes useState calls
  const [state, dispatch] = useReducer(stopwatchReducer, initialState)

  const [currentMode, setCurrentMode] = useState('clock')
  const [time, setTime] = useState(new Date())
  const [isPulsing, setIsPulsing] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [stats, setStats] = useState({
    steps: 8432,
    calories: 420,
    heartRate: 72,
  })

  // ← each handler dispatches a single action
  const handleStart = useCallback(() => {
    dispatch({ type: 'START' })
    intervalRef.current = setInterval(() => {
      elapsedRef.current += 100
      dispatch({ type: 'TICK' })
    }, 100)
  }, [])

  const handleStop = useCallback(() => {
    dispatch({ type: 'STOP' })
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' })
    clearInterval(intervalRef.current)
    intervalRef.current = null
    elapsedRef.current = 0
  }, [])

  const handleLap = useCallback(() => {
    dispatch({ type: 'LAP', value: formatTime(elapsedRef.current) })
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
            currentTime={formatTime(state.elapsed)}
            isRunning={state.isRunning}
            lapTimes={state.lapTimes}
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
            format={timeFormat}
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