function WatchFrame({ children }) {
  return (
    <div
      className="flex items-center justify-center shadow-2xl bg-gray-800 border-2 border-gray-700 w-[310px] h-[310px] [clip-path:polygon(25%_0%,75%_0%,100%_25%,100%_75%,75%_100%,25%_100%,0%_75%,0%_25%)]"
    >
      <div
        className="flex flex-col items-center justify-center gap-4 p-4 bg-gray-900 w-[280px] h-[280px] [clip-path:polygon(25%_0%,75%_0%,100%_25%,100%_75%,75%_100%,25%_100%,0%_75%,0%_25%)]"
      >
        {children}
      </div>
    </div>
  )
}
export default WatchFrame