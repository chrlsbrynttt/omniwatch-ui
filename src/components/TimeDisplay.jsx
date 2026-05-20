function TimeDisplay({ hours, minutes, seconds, format }) {
  const displayHours = format === '12'
    ? (parseInt(hours) % 12 || 12).toString().padStart(2, '0')
    : hours
  const period = format === '12'
    ? parseInt(hours) >= 12 ? 'PM' : 'AM'
    : null

  const now = new Date()
  const day = now.toLocaleDateString('en-US', { weekday: 'long' })
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-400 text-[10px] tracking-widest uppercase mb-1">
        {day}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-white text-4xl font-bold tracking-tight">
          {displayHours}:{minutes}
        </span>
        {period && (
          <span className="text-white text-4xl font-bold tracking-tight">
            {period}
          </span>
        )}
      </div>
      <span className="text-gray-400 text-xs mt-1">
        {date} · {seconds}s
      </span>
    </div>
  )
}
export default TimeDisplay