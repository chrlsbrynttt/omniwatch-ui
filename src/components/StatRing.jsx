function StatRing({ label, value, target, color, isAnimating }) {
  return (
    <div className={`w-14 h-14 rounded-full border-4 ${color} flex items-center justify-center bg-gray-900 shadow-lg`}>
      <div className="flex flex-col items-center justify-center">
        <span className={`text-white text-[11px] font-bold leading-none transition-opacity duration-300 ${isAnimating ? 'opacity-30' : 'opacity-100'}`}>{value}</span>
        <span className="text-gray-400 text-[8px] leading-none mt-0.5">{label}</span>
      </div>
    </div>
  )
}
export default StatRing