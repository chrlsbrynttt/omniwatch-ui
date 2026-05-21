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
  const year = now.getFullYear()

  return (
    <div className="flex flex-col items-center gap-1">
      <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet" />

      {/* day */}
      <span
        className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border border-blue-900 text-blue-400"
      >
        {day}
      </span>

      {/* time */}
      <div className="flex items-baseline gap-1">
        <span className="text-white text-4xl tracking-tight" style={{ fontFamily: "'Fredoka One', cursive" }}>
          {displayHours}:{minutes}
        </span>
        {period && (
          <span className="text-blue-400 text-lg" style={{ fontFamily: "'Fredoka One', cursive" }}>
            {period}
          </span>
        )}
      </div>

      {/* seconds */}
      <div
        className="flex items-center gap-1 bg-blue-950 px-2 py-0.5 rounded-full"
      >
        <span className="text-blue-400 text-[9px] tracking-widest uppercase">sec</span>
        <span className="text-white text-[10px] font-bold" style={{ fontFamily: "'Fredoka One', cursive" }}>{seconds}</span>
      </div>

      {/* date + year */}
      <div className="flex items-center gap-1.5 text-[10px]">
        <span className="text-gray-400">{date}</span>
        <span className="text-blue-900">|</span>
        <span className="text-gray-500">{year}</span>
      </div>
    </div>
  )
}
export default TimeDisplay