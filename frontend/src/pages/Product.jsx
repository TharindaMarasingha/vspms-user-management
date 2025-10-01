import { useState } from 'react'
import Button from '../components/Button'
import Chip from '../components/Chip'

export default function Product() {
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('overview')
  const img = 'https://dummyimage.com/800x600/EEF1F4/2B2F36.png&text=Product'

  return (
    <div className="container-1280 py-8 space-y-8 animate-slideUp">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card p-4">
          <div className="aspect-[4/3] bg-softgray/60 flex items-center justify-center rounded-lg">
            <img src={img} alt="" className="object-contain max-h-full" />
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {Array.from({length:5}, (_,i)=> (
              <img key={i} src={img} className="rounded-md bg-softgray" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-display text-2xl">Alternator – OEM 12345</h1>
          <div className="flex gap-2 items-center">
            <Chip color="success">In Stock</Chip>
            <span className="text-coolgray">Part No. OEM-12345</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <select className="h-11 rounded-lg bg-white border border-black/10 px-2">Make</select>
            <select className="h-11 rounded-lg bg-white border border-black/10 px-2">Model</select>
            <select className="h-11 rounded-lg bg-white border border-black/10 px-2">Year</select>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-semibold">$129.00</div>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button className="w-10 h-10" onClick={()=>setQty(q => Math.max(1, q-1))}>-</button>
              <input value={qty} readOnly className="w-12 h-10 text-center" />
              <button className="w-10 h-10" onClick={()=>setQty(q => q+1)}>+</button>
            </div>
          </div>
          <div className="flex gap-3">
            <Button>Add to Cart →</Button>
            <Button variant="subtle">Wishlist</Button>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex gap-2">
          {['overview','specs','compat','supplier'].map(k => (
            <button key={k} className={`px-3 py-2 rounded-md ${tab===k? 'bg-softgray' : 'hover:bg-softgray'}`} onClick={()=>setTab(k)}>
              {({overview:'Overview', specs:'Specs', compat:'Compatibility', supplier:'Supplier'})[k]}
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-coolgray">
          {tab==='overview' && (<p>High quality alternator compatible with multiple models. Backed by warranty.</p>)}
          {tab==='specs' && (<p>Voltage: 12V • Amperage: 110A • Pulley: 6-Groove</p>)}
          {tab==='compat' && (<p>Toyota Corolla 2010–2014, Honda Civic 2012–2015, Nissan Sunny 2011–2016</p>)}
          {tab==='supplier' && (<p>Supplier: VSPMS Warehouse • Lead time: 2 days • MOQ: 1</p>)}
        </div>
      </div>
    </div>
  )
}

