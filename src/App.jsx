import { useState, useEffect } from 'react'   // ← add this
import WatchFrame from './components/WatchFrame'
import TimeDisplay from './components/TimeDisplay'
import StopwatchWidget from './components/StopwatchWidget'
import StatRing from './components/StatRing'

function App() {
  const currentMode = 'clock'
  const [time, setTime] = useState(new Date())   // ← state at top level

  useEffect(() => {                              // ← hook at top level, NOT inside JSX
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <WatchFrame>
        {currentMode === 'clock' && (
          <TimeDisplay                           // ← live values, not hardcoded strings
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
            currentTime="01:23.45"
            isRunning={false}
            lapTimes={['00:58.20', '00:25.25']}
          />
        )}
      </WatchFrame>
    </div>
  )
}
export default App