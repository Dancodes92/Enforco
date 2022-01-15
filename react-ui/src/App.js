import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Toaster position="top" />
      <Navbar />
      <Routes />
    </div>
  )
}






