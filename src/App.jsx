import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/productCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductCard name="Laptop - HP" price="100,000.00" image="https://picsum.photos/id/60/200/300.jpg"/>
      <ProductCard name="Laptop - ACER" price="200,000.00" image="https://picsum.photos/id/20/200/300.jpg"/>
      <ProductCard name="Watch" price="5,000.00" image="https://picsum.photos/id/5/200/300.jpg"/>
    </>
  )
}

export default App
