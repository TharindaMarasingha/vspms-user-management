export default function Footer() {
  return (
    <footer className="mt-10 border-t border-black/5 bg-white">
      <div className="container-1280 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-xl text-primary">VSPMS</div>
          <p className="text-sm text-coolgray mt-2">Vehicle Spare-Parts Management System</p>
        </div>
        <div>
          <div className="font-medium mb-2">Contact</div>
          <ul className="text-sm space-y-1 text-coolgray">
            <li>+94 11 234 5678</li>
            <li>support@vspms.com</li>
            <li>1234, Colombo, Sri Lanka</li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Quick Links</div>
          <ul className="text-sm space-y-1 text-coolgray">
            <li><a href="#" className="hover:text-primary">About Us</a></li>
            <li><a href="#" className="hover:text-primary">Categories</a></li>
            <li><a href="#" className="hover:text-primary">Support</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Popular Tags</div>
          <div className="flex flex-wrap gap-2">
            {['Alternator','Brake Pads','Timing Belt','Dashboard Cluster'].map(t => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-softgray text-slate">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-coolgray pb-6">© {new Date().getFullYear()} VSPMS</div>
    </footer>
  )
}

