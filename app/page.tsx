"use client"

import { useState } from "react"
import { Press_Start_2P } from "next/font/google"

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
})

export default function Home() {

  const [copied, setCopied] = useState(false)

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText("play.prysmania.com")
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 3000)

    } catch (err) {
      console.error("Error copiando IP:", err)
    }
  }

  return (
    <main className={`bg-[#0f0f0f] text-white ${pressStart.className}`}>

{/* HERO */}
<section className="relative flex flex-col items-center justify-center text-center py-32 px-6 overflow-hidden">

  {/* Imagen de fondo */}
  <div className="absolute inset-0 bg-[url('/ImagenHero.jpg')] bg-cover bg-center opacity-90"></div>

  {/* Overlay oscuro */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0f0f0f]"></div>

  {/* Contenido */}
  <div className="relative z-10">

    <h1 className="text-4xl md:text-6xl tracking-wider text-yellow-400 mb-8">
      PRYSMANIA
    </h1>

    <p className="text-sm text-gray-300 mb-10">
      PLAY.PRYSMANIA.COM | JAVA EDITION 1.21.11
    </p>

<div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">

  {/* BOTÓN IP */}
  <button
    onClick={handleCopyIP}
    className="cursor-pointer bg-yellow-500 text-black 
               px-10 py-4 text-xs tracking-wider
               border-2 border-yellow-300
               shadow-[0_4px_0_#a16207]
               hover:shadow-[0_6px_0_#a16207]
               hover:-translate-y-1
               active:translate-y-1 active:shadow-[0_2px_0_#a16207]
               transition-all duration-150"
  >
    {copied ? "¡IP COPIADA!" : "> IP <"}
  </button>

  {/* BOTÓN TIENDA */}
  <a
    href="https://tienda.prysmania.com"
    target="_blank"
    rel="noopener noreferrer"
    className="cursor-pointer bg-yellow-500 text-black 
               px-10 py-4 text-xs tracking-wider
               border-2 border-yellow-300
               shadow-[0_4px_0_#a16207]
               hover:shadow-[0_6px_0_#a16207]
               hover:-translate-y-1
               active:translate-y-1 active:shadow-[0_2px_0_#a16207]
               transition-all duration-150 inline-block"
  >
    TIENDA
  </a>

  {/* BOTÓN DISCORD */}
  <a
    href="https://discord.gg/HdjDaGXB24"
    target="_blank"
    rel="noopener noreferrer"
    className="cursor-pointer bg-yellow-500 text-black 
               px-10 py-4 text-xs tracking-wider
               border-2 border-yellow-300
               shadow-[0_4px_0_#a16207]
               hover:shadow-[0_6px_0_#a16207]
               hover:-translate-y-1
               active:translate-y-1 active:shadow-[0_2px_0_#a16207]
               transition-all duration-150 inline-block"
  >
    DISCORD
  </a>

</div>



  </div>
</section>

{/* MODALIDAD */}
<section className="relative py-32 px-6 max-w-7xl mx-auto overflow-hidden">

  {/* ================= DECORACIÓN FONDO ================= */}

{/* ÁRBOLES IZQUIERDA */}
  <img
    src="/decor-tree-left.png"
    className="hidden xl:block absolute left-0 bottom-0 w-72 opacity-70 pointer-events-none"
  />

  <img
    src="/decor-tree-left.png"
    className="hidden xl:block absolute left-32 bottom-6 w-56 opacity-100 pointer-events-none scale-x-[-1]"
  />

  {/* ÁRBOLES DERECHA */}
  <img
    src="/decor-tree-right.png"
    className="hidden xl:block absolute right-0 bottom-0 w-72 opacity-70 pointer-events-none scale-x-[-1]"
  />

  <img
    src="/decor-tree-right.png"
    className="hidden xl:block absolute right-32 bottom-8 w-56 opacity-100 pointer-events-none"
  />

  {/* ORES LATERALES */}
  <img
    src="/decor-ore-left.png"
    className="hidden lg:block absolute left-20 top-1/3 w-28 opacity-75 pointer-events-none rotate-[-10deg]"
  />

  <img
    src="/decor-ore-right.png"
    className="hidden lg:block absolute right-20 top-1/4 w-28 opacity-75 pointer-events-none rotate-[12deg] scale-x-[-1]"
  />

  {/* HERRAMIENTAS SUPERIORES */}
  <img
    src="/sword.png"
    className="hidden lg:block absolute left-1/4 top-12 w-20 opacity-75 pointer-events-none rotate-[-18deg]"
  />

  <img
    src="/pickaxe.png"
    className="hidden lg:block absolute right-1/4 top-16 w-24 opacity-75 pointer-events-none rotate-[18deg] scale-x-[-1]"
  />

  {/* ANIMALES VISIBLES (NO TAN TRANSPARENTES) */}
  <img
    src="/cow.png"
    className="hidden lg:block absolute left-1/4 bottom-1 w-24 opacity-75 pointer-events-none"
  />

  <img
    src="/sheep.png"
    className="hidden lg:block absolute right-1/4 bottom-1 w-22 opacity-75 pointer-events-none scale-x-[-1]"
  />

  <img
    src="/chicken.png"
    className="hidden lg:block absolute left-1/2 bottom-6 -translate-x-1/2 w-16 opacity-75 pointer-events-none"
  />

  {/* ================= TÍTULO ================= */}

  <h2 className="text-2xl text-center text-yellow-400 mb-16 tracking-widest relative z-10">
    MODALIDAD
  </h2>

  {/* ================= CARD CENTRAL ================= */}

  <div className="flex justify-center relative z-10">

    <div className="relative max-w-2xl w-full group overflow-hidden rounded-2xl border border-gray-800 hover:border-yellow-500 transition duration-500">

      {/* Imagen fondo */}
      <div className="absolute inset-0">
        <img
          src="/survival-bg.jpg"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/75 group-hover:bg-black/60 transition duration-500"></div>

      {/* Glow interno */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(250,204,21,0.25)] opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* Contenido */}
      <div className="relative z-10 p-20 text-center">

        <h3 className="text-xl mb-8 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent tracking-widest">
          SURVIVAL VANILLA+ PVP
        </h3>

        <p className="text-sm text-gray-300 leading-relaxed text-center max-w-md mx-auto">
          Experiencia semivanilla competitiva con PvP activo,
          economía balanceada y progresión avanzada.
          Domina el mundo, forma alianzas y conquista el servidor.
        </p>

      </div>

    </div>

  </div>

</section>


{/* STAFF */}
<section className="py-28 px-6 bg-[#141414]">

  <h2 className="text-2xl text-center text-yellow-400 mb-20 tracking-widest">
    NUESTRO STAFF
  </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">

    {[
      { role: "OWNER", username: "ItsArchi_" },
      { role: "MOD", username: "KiratohV76" },
      { role: "SUB-MOD", username: "BUNK00" },
      { role: "AYUDANTE", username: "Wolferasgamer" },
    ].map((member) => (
      <div
        key={member.username}
        className="group bg-[#1a1a1a] p-8 rounded-xl text-center border border-gray-800 hover:border-yellow-500 transition duration-300 hover:-translate-y-2"
      >
        {/* Cabeza Minecraft automática */}
        <img
          src={`https://mc-heads.net/avatar/${member.username}`}
          alt={member.username}
          className="w-24 h-24 mx-auto mb-6 border-2 border-gray-700 group-hover:border-yellow-500 transition duration-300"
        />

        {/* Rol */}
        <h3 className="text-xs text-yellow-400 mb-2 tracking-widest">
          {member.role}
        </h3>

        {/* Nombre */}
        <p className="text-gray-300 text-sm tracking-wide">
          {member.username}
        </p>
      </div>
    ))}

  </div>
</section>


{/* FOOTER */}
<footer className="text-center py-10 text-gray-600 border-t border-gray-800 text-xs">
  © 2026 PRYSMANIA NETWORK - TODOS LOS DERECHOS RESERVADOS
</footer>

    </main>
  )
}
