import { useState, useEffect } from 'react'
import WatchFrame from './components/WatchFrame'
import TimeDisplay from './components/TimeDisplay'
import StopwatchWidget from './components/StopwatchWidget'
import StatRing from './components/StatRing'
import ModeToggle from './components/ModeToggle'

function formatTime(cs) {
  const min = Math.floor(cs / 6000)
  const sec = Math.floor((cs % 6000) / 100)
  const cent = cs % 100
  return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(cent).padStart(2,'0')}`
}

function App() {
  const [currentMode, setCurrentMode] = useState('clock')
  const [time, setTime] = useState(new Date())
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [lapTimes, setLapTimes] = useState([])

  // ← stats state goes here, at the top level with all other state
  const [stats, setStats] = useState({
    steps: 8432,
    calories: 420,
    heartRate: 72,
  })

  const handleStart = () => setIsRunning(true)
  const handleStop  = () => setIsRunning(false)
  const handleReset = () => { setIsRunning(false); setElapsed(0); setLapTimes([]) }
  const handleLap   = () => setLapTimes(prev => [...prev, formatTime(elapsed)])

  // ← handleSyncStats goes here, with all other handlers
  const handleSyncStats = () => {
    setStats({
      steps:     Math.floor(Math.random() * 7001) + 5000,
      calories:  Math.floor(Math.random() * 601)  + 200,
      heartRate: Math.floor(Math.random() * 53)   + 58,
    })
  }

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => setElapsed(prev => prev + 10), 100)
    return () => clearInterval(id)
  }, [isRunning])

  // ← heart rate pulse goes here, with all other useEffects
  useEffect(() => {
    const id = setInterval(() => {
      const delta = Math.floor(Math.random() * 10) - 5
      setStats(prev => ({ ...prev, heartRate: prev.heartRate + delta }))
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <WatchFrame>
        <ModeToggle currentMode={currentMode} onModeChange={setCurrentMode} />

        {currentMode === 'clock' && (
          <TimeDisplay
            hours={time.getHours() % 12 || 12}
            minutes={String(time.getMinutes()).padStart(2, '0')}
            seconds={String(time.getSeconds()).padStart(2, '0')}
            format="12"
          />
        )}

        {/* ← stat rings now use live stats state instead of hardcoded values */}
        <div className="flex gap-4">
          <StatRing label="Steps" value={stats.steps} target="10,000" color="border-green-500" />
          <StatRing label="Cal" value={stats.calories} target="600" color="border-orange-500" />
          <StatRing label="BPM" value={stats.heartRate} target="120" color="border-red-500" />
        </div>

        {/* ← sync button sits here, below the rings */}
        <button
          onClick={handleSyncStats}
          className="bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all duration-150 text-white text-xs font-medium px-3 py-1.5 rounded-full"
        >
          ↺ Sync Stats
        </button>

        {currentMode === 'stopwatch' && (
          <StopwatchWidget
            currentTime={formatTime(elapsed)}
            isRunning={isRunning}
            lapTimes={lapTimes}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
            onLap={handleLap}
          />
        )}
      </WatchFrame>
    </div>
  )
}
export default App