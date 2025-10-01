import Button from '../components/Button'
import ProductCard from '../components/ProductCard'

const categories = [
  'Engine & Drivetrain',
  'Electrical & Sensors',
  'Body & Exterior',
  'Brakes & Suspension',
  'Fluids & Filters',
  'Tools & Accessories'
]

const sample = Array.from({ length: 8 }, (_, i) => ({
  id: i+1,
  title: ['Alternator','Brake Pad Set','Timing Belt Kit','O2 Sensor','Shock Absorber','Oil Filter','Wiper Blade','Spark Plug'][i%8] + ' – OEM Quality',
  price: (29 + i*7).toFixed(2),
  image: 'https://dummyimage.com/600x400/EEF1F4/2B2F36.png&text=Part',
  compat: ['Toyota', 'Honda', 'Nissan', 'Mazda', 'BMW']
}))

export default function Home() {
  return (
    <div className="container-1280 py-8 space-y-10 animate-slideUp">
      {/* Hero */}
      <section className="rounded-xl overflow-hidden bg-gradient-to-r from-primary to-primary/90 text-white shadow-soft">
        <div className="px-6 sm:px-12 py-12 sm:py-16 grid md:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">Find. Manage. Deliver. Faster.</h1>
            <p className="mt-3 text-white/90">Modern storefront for automotive spare parts with powerful back-office.</p>
            <div className="mt-6">
              <Button variant="primary" className="bg-white text-primary hover:bg-white/95">Browse Categories →</Button>
            </div>
          </div>
          <div className="glass rounded-xl p-5 bg-white/15">
            <div className="text-sm mb-2 opacity-90">Quick Search</div>
            <input className="w-full h-12 rounded-xl px-4 text-slate" placeholder="Search parts, brand, vehicle…" />
            <div className="text-xs mt-2 opacity-80">Try: Alternator, Brake Pads, Timing Belt</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="font-display text-xl mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <div key={c} className="card px-4 py-6 text-center hover-lift">
              <div className="font-medium">{c}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Featured Parts</h2>
          <a href="#" className="text-primary">View all</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sample.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promo strip */}
      <section className="grid sm:grid-cols-3 gap-4">
        {['Track Order','Compare','Customer Support'].map((s) => (
          <div key={s} className="card p-5 flex items-center justify-between hover-lift">
            <div className="font-medium">{s}</div>
            <Button variant="ghost">Learn more →</Button>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="card p-6">
        <div className="font-display text-xl mb-4">What customers say</div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-coolgray">
          {['Fast delivery and genuine parts.','Easy to find compatible parts.','Great support for suppliers and customers.'].map((t,i) => (
            <blockquote key={i} className="bg-softgray rounded-lg p-4">“{t}”</blockquote>
          ))}
        </div>
      </section>
    </div>
  )
}

