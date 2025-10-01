import { useState } from 'react'
import Button from '../components/Button'

export default function Auth() {
  const [tab, setTab] = useState('signin')
  const [invalid, setInvalid] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    // demo validation shake
    setInvalid(true)
    setTimeout(() => setInvalid(false), 220)
  }

  return (
    <div className="container-1280 py-10 grid place-items-center">
      <div className="card w-full max-w-md p-6 animate-slideUp">
        <div className="tabs">
          <button className={`tab ${tab==='signin'?'active':''}`} onClick={()=>setTab('signin')}>Sign In</button>
          <button className={`tab ${tab==='signup'?'active':''}`} onClick={()=>setTab('signup')}>Sign Up</button>
        </div>

        {tab==='signin' && (
          <form onSubmit={onSubmit} className={`space-y-4 mt-5 ${invalid?'animate-microShake':''}`}>
            <div>
              <label className="text-sm">Email Address</label>
              <input className="w-full h-11 rounded-lg px-3 bg-softgray focus-ring" type="email" required />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <label>Password</label>
                <a href="#" className="text-primary">Forgot Password</a>
              </div>
              <div className="relative">
                <input id="login-pass" className="w-full h-11 rounded-lg px-3 bg-softgray focus-ring" type="password" required />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-coolgray">👁</button>
              </div>
            </div>
            <Button className="w-full">Sign In →</Button>
            <div className="flex gap-3">
              <button type="button" className="flex-1 h-11 rounded-lg border border-black/10">Google</button>
              <button type="button" className="flex-1 h-11 rounded-lg border border-black/10">Apple</button>
            </div>
          </form>
        )}

        {tab==='signup' && (
          <form onSubmit={onSubmit} className={`space-y-4 mt-5 ${invalid?'animate-microShake':''}`}>
            <div>
              <label className="text-sm">Full Name</label>
              <input className="w-full h-11 rounded-lg px-3 bg-softgray focus-ring" type="text" required />
            </div>
            <div>
              <label className="text-sm">Email Address</label>
              <input className="w-full h-11 rounded-lg px-3 bg-softgray focus-ring" type="email" required />
            </div>
            <div>
              <label className="text-sm">Password</label>
              <input className="w-full h-11 rounded-lg px-3 bg-softgray focus-ring" type="password" required />
            </div>
            <Button className="w-full">Create Account →</Button>
          </form>
        )}
      </div>
    </div>
  )
}

