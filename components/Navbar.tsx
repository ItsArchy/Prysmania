"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [minecraftUsername, setMinecraftUsername] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      const currentUser = data.user
      setUser(currentUser)

      if (currentUser) {
        await loadMinecraft(currentUser.id)
      }
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          await loadMinecraft(currentUser.id)
        } else {
          setMinecraftUsername(null)
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  /* ===== CARGAR USERNAME MINECRAFT ===== */

  const loadMinecraft = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("minecraft_username")
      .eq("id", userId)
      .single()

    setMinecraftUsername(data?.minecraft_username || null)
  }

  /* ===== LOGIN DISCORD ===== */

  const handleDiscordLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: "http://localhost:3000/perfil",
      },
    })
  }

  /* ===== LOGOUT ===== */

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const minecraftHead = minecraftUsername || "Steve"

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#0f0f0f] border-b border-[#1f1f1f] text-white">

      {/* IZQUIERDA: LOGO + INICIO */}
      <div className="flex items-center gap-6">

        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Prysmania Logo"
            className="h-10 object-contain"
          />
        </Link>

        <Link
          href="/"
          className="hover:text-yellow-400 transition"
        >
          Inicio
        </Link>

      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-6">

        {!user ? (
          <button
            onClick={handleDiscordLogin}
            className="bg-[#5865F2] hover:bg-[#4752c4] px-4 py-2 rounded font-semibold transition"
          >
            Iniciar con Discord
          </button>
        ) : (
          <>
            <Link
              href="/perfil"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <img
                src={`https://mc-heads.net/avatar/${minecraftHead}`}
                className="w-8 h-8 rounded"
              />
              <span>Mi Cuenta</span>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
            >
              Cerrar sesión
            </button>
          </>
        )}

      </div>

    </nav>
  )
}
