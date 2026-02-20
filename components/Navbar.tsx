"use client"

import { useEffect, useState } from "react"

export default function Navbar() {

  const TEN_HOURS = 10 * 60 * 60 // segundos
  const [timeLeft, setTimeLeft] = useState<number>(TEN_HOURS)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 
                    flex justify-center items-center 
                    gap-8
                    py-6 
                    bg-[#0f0f0f] 
                    border-b border-[#1f1f1f]">

      <img
        src="/logo.png"
        alt="Prysmania Logo"
        className="h-14 w-14 object-contain rounded-full"
      />

      <div className="text-white text-xl tracking-widest font-mono">
        {formatTime(timeLeft)}
      </div>

    </nav>
  )
}
