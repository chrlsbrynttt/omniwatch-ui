import { useState, useEffect } from 'react'
import WatchFrame from './components/WatchFrame'
import TimeDisplay from './components/TimeDisplay'
import StopwatchWidget from './components/StopwatchWidget'
import StatRing from './components/StatRing'
import ModeToggle from './components/ModeToggle'   // ← import the new component

function formatTime(cs) {
  const min = Math.floor(cs / 6000)
  const sec = Math.floor((cs % 6000) / 100)
  const cent = cs % 100
  return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(cent).padStart(2,'0')}`
}

function App() {
  // ← currentMode is now state, not a const
  const [currentMode, setCurrentMode] = useState('clock')

  const [time, setTime] = useState(new Date())
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [lapTimes, setLapTimes] = useState([])

  const handleStart = () => setIsRunning(true)
  const handleStop  = () => setIsRunning(false)
  const handleReset = () => { setIsRunning(false); setElapsed(0); setLapTimes([]) }
  const handleLap   = () => setLapTimes(prev => [...prev, formatTime(elapsed)])

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => setElapsed(prev => prev + 10), 10)
    return () => clearInterval(id)
  }, [isRunning])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <WatchFrame>
        {/* ← ModeToggle sits here, inside WatchFrame, above everything else */}
        <ModeToggle currentMode={currentMode} onModeChange={setCurrentMode} />

        {currentMode === 'clock' && (
          <TimeDisplay
            hours={time.getHours() % 12 || 12}
            minutes={String(time.getMinutes()).padStart(2, '0')}
            seconds={String(time.getSeconds()).padStart(2, '0')}
            format="12"
          />
        )}
        <div className="flex gap-4">
          <StatRing label="Steps" value="8,432" target="10,000" color="border-green-500" />
          <StatRing label="Calories" value="420" target="600" color="border-orange-500" />
          <StatRing label="Heart Rate" value="72" target="120" color="border-red-500" />
        </div>
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