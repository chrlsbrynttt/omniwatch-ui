function WatchFrame({ children }) {
  return (
    <div
      className="flex items-center justify-center shadow-2xl w-[290px] h-[310px] rounded-[3rem]"
      style={{ background: 'linear-gradient(135deg, #1e3a5f, #0d1f36)', border: '2px solid #2a4a6b' }}
    >
      <div
        className="flex flex-col items-center justify-center gap-4 p-4 w-[270px] h-[290px] rounded-[2.5rem]"
        style={{ background: '#070f1a' }}
      >
        {children}
      </div>
    </div>
  )
}
export default WatchFrame