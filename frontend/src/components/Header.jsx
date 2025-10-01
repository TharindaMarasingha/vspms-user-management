import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2 focus-ring">
      <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
        <span className="absolute inset-0 rounded-full border-2 border-white/30"></span>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17 4.9 19.1" />
        </svg>
      </span>
      <div className="leading-tight">
        <div className="font-display text-lg leading-none">VSPMS</div>
        <div className="text-[11px] tracking-wide text-coolgray">Find. Manage. Deliver. Faster.</div>
      </div>
    </NavLink>
  )
}

export default function Header() {
  return (
    <header className="bg-primary text-white">
      <div className="bg-primary/90">
        <div className="container-1280 py-2 text-sm flex items-center justify-between opacity-95">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">EN</span>
            <span className="hidden sm:inline">USD</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Support</a>
            <a href="#" className="hover:underline">Need Help</a>
          </div>
        </div>
      </div>
      <div className="container-1280 py-3">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="flex-1"><SearchBar /></div>
          <nav className="flex items-center gap-3">
            <NavLink to="/cart" className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">Cart</NavLink>
            <NavLink to="/auth" className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">Sign In</NavLink>
          </nav>
        </div>
        <div className="mt-3 flex gap-2 text-sm">
          <NavLink to="/" className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20">All Categories</NavLink>
          <a className="px-3 py-1.5 rounded-md hover:bg-white/10" href="#">Track Order</a>
          <a className="px-3 py-1.5 rounded-md hover:bg-white/10" href="#">Compare</a>
          <a className="px-3 py-1.5 rounded-md hover:bg-white/10" href="#">Support</a>
          <a className="px-3 py-1.5 rounded-md hover:bg-white/10" href="#">+94 11 234 5678</a>
        </div>
      </div>
    </header>
  )
}

