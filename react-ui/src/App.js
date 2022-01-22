import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className="bg-[#444B48] scrollbar-hide">
      <Toaster position="top" />
      <Navbar />
      <Routes />
    </div>
  )
}







