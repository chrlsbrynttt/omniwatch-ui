function ModeToggle({ currentMode, onModeChange }) {
  const nextMode = currentMode === 'clock' ? 'stopwatch' : 'clock'
  const label    = currentMode === 'clock' ? 'Stopwatch' : 'Clock'
  return (
    <button
      onClick={() => onModeChange(nextMode)}
      className="bg-blue-600 hover:bg-blues-700 active:scale-95 transition-all duration-150 text-white text-xs font-medium px-3 py-1.5 rounded-full"
    >
      {label}
    </button>
  )
}
export default ModeToggle