export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search parts, brand, vehicle…"
        className="w-full h-12 rounded-xl pl-12 pr-4 bg-white text-slate placeholder:text-coolgray shadow-soft focus-ring"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-coolgray">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" /><path d="M20 20l-3-3" />
        </svg>
      </span>
    </div>
  )
}

