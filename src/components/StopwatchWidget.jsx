function StopwatchWidget({ currentTime, isRunning, lapTimes, onStart, onStop, onReset, onLap }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full px-2">
      <span className="text-[8px] text-gray-400 tracking-widest">STOPWATCH</span>
      <span className={`text-xl font-bold leading-none ${isRunning ? 'text-green-400' : 'text-white'}`}>
        {currentTime}
      </span>
      <div className="flex gap-1.5 flex-wrap justify-center max-h-12 overflow-y-auto w-full">
        {lapTimes.length > 0 ? (
          lapTimes.map((lap, index) => (
            <div key={index} className="bg-gray-800 rounded px-1 py-0.5 text-[7px] text-gray-300 whitespace-nowrap">
              L{index + 1} {lap}
            </div>
          ))
        ) : (
          <span className="text-[7px] text-gray-500">No laps</span>
        )}
      </div>
      <div className="flex gap-1.5 justify-center">
        {isRunning ? (
          <button onClick={onStop} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-[9px] font-medium">
            Stop
          </button>
        ) : (
          <button onClick={onStart} className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-[9px] font-medium">
            Start
          </button>
        )}
        <button onClick={onLap} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-[9px] font-medium">
          Lap
        </button>
        <button onClick={onReset} className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-[9px] font-medium">
          Reset
        </button>
      </div>
    </div>
  )
}
export default StopwatchWidget