import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Content from './pages/Content'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Placeorder from './pages/Placeorder'
import Order from './pages/Order'

const App = () => {
  return (
    <div className="flex min-h-dvh flex-col bg-white font-sans text-neutral-900 antialiased">
      <Navbar />
      <main className="flex-1 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] xl:px-[11vw] 2xl:px-[13vw]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/content" element={<Content />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
