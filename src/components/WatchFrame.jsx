function WatchFrame({ children }) {
  return (
    <div
      className="flex items-center justify-center shadow-2xl bg-gradient-to-br from-slate-400 to-slate-600 border-2 border-slate-300 w-[310px] h-[310px] [clip-path:polygon(25%_0%,75%_0%,100%_25%,100%_75%,75%_100%,25%_100%,0%_75%,0%_25%)]"
    >
      <div
        className="flex flex-col items-center justify-center gap-4 p-4 bg-slate-950 w-[280px] h-[280px] [clip-path:polygon(25%_0%,75%_0%,100%_25%,100%_75%,75%_100%,25%_100%,0%_75%,0%_25%)]"
      >
        {children}
      </div>
    </div>
  )
}
export default WatchFrame