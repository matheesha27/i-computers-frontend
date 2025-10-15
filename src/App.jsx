import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/productCard'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)

  return(
    <>
      <div className="w-[120px] h-[120px] border bg-[#F5A427] relative">
        <div className='w-[100px] h-[100px] bg-blue-400 flex flex-col justify-center items-center'>
          <div className='w-[30px] h-[30px] bg-amber-300'>

          </div>
          <div className='w-[30px] h-[30px] bg-red-500 fixed right-[20px] bottom-[20px]'>
            <h8>fixed</h8>
          </div>
          <div className='w-[30px] h-[30px] bg-green-400 absolute right-[20px] bottom-[20px]'>

          </div>
        </div>
      </div>
      <div className='w-[100px] h-[100px] bg-pink-400 absolute'>
        
      </div>
    </>
  )
}

export default App
