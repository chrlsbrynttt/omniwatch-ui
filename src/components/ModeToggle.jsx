function ModeToggle({ currentMode, onModeChange }) {
  const nextMode = currentMode === 'clock' ? 'stopwatch' : 'clock'
  const label    = currentMode === 'clock' ? 'Stopwatch' : 'Clock'
  return (
    <button
      onClick={() => onModeChange(nextMode)}
      className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 active:scale-95 transition-all duration-150 text-white text-xs font-medium px-3 py-1.5 rounded-full border border-blue"
    >
      {label}
    </button>
  )
}
export default ModeToggle