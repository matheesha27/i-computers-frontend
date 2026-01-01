import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/productCard'
import Header from './components/header'
// import Test from './components/test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import { Toaster } from 'react-hot-toast'

function App() {
  return(
    <BrowserRouter>
    <Toaster position='top-right'/>
      <div className="w-full h-screen bg-primary">
        <Routes path="/">
          <Route path="/*" element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/test' element={<TestPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
