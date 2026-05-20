function StopwatchWidget({ currentTime, isRunning, lapTimes, onStart, onStop, onReset, onLap }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs text-gray-400 tracking-widest">STOPWATCH</span>
      <span className={`text-3xl font-bold ${isRunning ? 'text-green-400' : 'text-white'}`}>
        {currentTime}
      </span>
      <div className="flex gap-2">
        {lapTimes.map((lap, index) => (
          <div key={index} className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-300">
            LAP {index + 1} &nbsp; {lap}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {isRunning ? (
          <button onClick={onStop} className="bg-red-600 text-white px-3 py-1 rounded text-sm">
            Stop
          </button>
        ) : (
          <button onClick={onStart} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
            Start
          </button>
        )}
        <button onClick={onLap} className="bg-gray-600 text-white px-3 py-1 rounded text-sm">
          Lap
        </button>
        <button onClick={onReset} className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
          Reset
        </button>
      </div>
    </div>
  )
}
export default StopwatchWidget