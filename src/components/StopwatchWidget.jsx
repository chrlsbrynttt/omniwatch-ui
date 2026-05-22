function StopwatchWidget({ currentTime, isRunning, lapTimes, onStart, onStop, onReset, onLap }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full px-2">
      {/* ← same pill badge style as the WEDNESDAY label */}
      <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border border-blue-900 text-blue-400">
        Stopwatch
      </span>
      <span className={`text-3xl font-bold leading-none ${isRunning ? 'text-green-400' : 'text-white'}`}>
        {currentTime}
      </span>
      <div className="flex flex-col items-center gap-1.5 max-h-24 overflow-y-auto w-full text-xs">
        {lapTimes.length > 0 ? (
          lapTimes.map((lap, index) => (
            <div key={index} className="bg-gray-800 rounded px-2 py-1 text-gray-300 whitespace-nowrap">
              L{index + 1} {lap}
            </div>
          ))
        ) : (
          <span className="text-gray-500">No laps</span>
        )}
      </div>
      <div className="flex gap-2.5 justify-center w-full">
        {isRunning ? (
          <button onClick={onStop} className="bg-red-600 hover:bg-red-500 active:scale-95 transition-all text-white px-3 py-1.5 rounded text-[10px] font-semibold flex-1 max-w-[60px]">
            Stop
          </button>
        ) : (
          <button onClick={onStart} className="bg-green-600 hover:bg-green-500 active:scale-95 transition-all text-white px-3 py-1.5 rounded text-[10px] font-semibold flex-1 max-w-[60px]">
            Start
          </button>
        )}
        <button onClick={onLap} className="bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-white px-3 py-1.5 rounded text-[10px] font-semibold flex-1 max-w-[60px]">
          Lap
        </button>
        <button onClick={onReset} className="bg-gray-600 hover:bg-gray-500 active:scale-95 transition-all text-white px-3 py-1.5 rounded text-[10px] font-semibold flex-1 max-w-[60px]">
          Reset
        </button>
      </div>
    </div>
  )
}
export default StopwatchWidget