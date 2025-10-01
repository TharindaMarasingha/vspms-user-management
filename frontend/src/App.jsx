import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Admin from './pages/Admin'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-40 animate-fadeIn">
        <Header />
        <div className="bg-white/70 backdrop-blur supports-[backdrop-filter]:glass">
          <div className="container-1280">
            <nav className="breadcrumb py-2">
              <NavLink to="/" className="hover:text-primary">Home</NavLink>
              <span className="sep">›</span>
              <span className="capitalize">{location.pathname.split('/')[1] || 'Storefront'}</span>
            </nav>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App

