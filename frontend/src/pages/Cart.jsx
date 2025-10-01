import { useState } from 'react'
import Button from '../components/Button'

export default function Cart() {
  const [step, setStep] = useState(0)
  const steps = ['Cart','Address','Payment','Review']
  return (
    <div className="container-1280 py-8 animate-slideUp">
      <div className="flex items-center gap-2 text-sm mb-6">
        {steps.map((s,i) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full ${i<=step?'bg-primary text-white':'bg-softgray'}`}>{s}</span>
            {i<steps.length-1 && <span>›</span>}
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {step===0 && (
            <div className="card p-4">Your cart items will appear here.</div>
          )}
          {step===1 && (
            <form className="card p-4 space-y-3">
              <div>
                <label className="text-sm">Address</label>
                <input className="w-full h-11 rounded-lg bg-softgray px-3" placeholder="123 Street" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className="h-11 rounded-lg bg-softgray px-3" placeholder="City" />
                <input className="h-11 rounded-lg bg-softgray px-3" placeholder="Postal Code" />
              </div>
            </form>
          )}
          {step===2 && (
            <form className="card p-4 space-y-3 animate-microShake">
              <div className="grid grid-cols-2 gap-3">
                <input className="h-11 rounded-lg bg-softgray px-3" placeholder="Card Number" />
                <input className="h-11 rounded-lg bg-softgray px-3" placeholder="Name on Card" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className="h-11 rounded-lg bg-softgray px-3" placeholder="MM/YY" />
                <input className="h-11 rounded-lg bg-softgray px-3" placeholder="CVC" />
              </div>
            </form>
          )}
          {step===3 && (
            <div className="card p-4 text-sm text-coolgray">Review your order and confirm purchase.</div>
          )}
          <div className="flex gap-3">
            <Button variant="subtle" onClick={()=>setStep(s => Math.max(0, s-1))}>Back</Button>
            <Button onClick={()=>setStep(s => Math.min(3, s+1))}>{step===3? 'Place Order' : 'Next →'}</Button>
          </div>
        </div>
        <aside className="card p-4 h-max sticky top-24">
          <div className="font-medium mb-2">Order Summary</div>
          <div className="text-sm text-coolgray space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>$256.00</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>$10.00</span></div>
            <div className="flex justify-between font-medium text-slate"><span>Total</span><span>$266.00</span></div>
          </div>
        </aside>
      </div>
    </div>
  )
}

