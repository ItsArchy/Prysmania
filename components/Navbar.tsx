"use client"

import { Press_Start_2P } from "next/font/google"

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
})

export default function Navbar() {

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 
                     flex justify-center items-center 
                     gap-8 py-6 
                     bg-[#0f0f0f] 
                     border-b border-[#1f1f1f]
                     ${pressStart.className}`}>

      <img
        src="/logo.png"
        alt="Prysmania Logo"
        className="h-14 w-14 object-contain rounded-full"
      />

      <div className="text-red-500 text-lg tracking-[4px]">
        ¡VOLVEREMOS PRONTO!
      </div>

    </nav>
  )
}
