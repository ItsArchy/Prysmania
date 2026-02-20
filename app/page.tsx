"use client"

import { Press_Start_2P } from "next/font/google"

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
})

export default function Home() {

  return (
    <main className={`relative min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-6 ${pressStart.className}`}>

      {/* Fondo */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/cueva.png')" }}
      />
      <div className="absolute inset-0 -z-10 bg-black/80" />

      {/* PANEL CENTRAL */}
      <div className="bg-[#111111]/80 backdrop-blur-lg p-14 rounded-2xl border border-gray-800 shadow-[0_15px_40px_rgba(0,0,0,0.7)] text-center max-w-2xl w-full">

        <h1 className="text-3xl text-yellow-400 mb-10 tracking-widest">
          ¡ALTO AHÍ!
        </h1>

        <p className="text-gray-300 text-sm leading-relaxed mb-12">
          Prysmania Web se encuentra en mantenimiento.<br />
          Estamos trabajando para mejorar su experiencia :)
        </p>

        {/* Imagen oveja */}
        <img
          src="/sheep.png"
          alt="Sheep"
          className="w-28 mx-auto opacity-90 hover:scale-110 transition duration-300"
        />

      </div>

    </main>
  )
}
