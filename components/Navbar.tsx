"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Press_Start_2P } from "next/font/google"

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
})

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [minecraftUsername, setMinecraftUsername] = useState<string | null>(null)
  const router = useRouter()

  /* =========================
     CARGAR USUARIO
  ========================== */

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      const currentUser = data.user
      setUser(currentUser)

      if (currentUser) {
        await loadMinecraft(currentUser.id)
      } else {
        setMinecraftUsername(null)
      }
    }

    loadUser()

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

  /* =========================
     CARGAR USERNAME MINECRAFT
  ========================== */

  const loadMinecraft = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("minecraft_username")
      .eq("id", userId)
      .single()

    setMinecraftUsername(data?.minecraft_username || null)
  }

  /* =========================
     LOGIN DISCORD
  ========================== */

  const handleDiscordLogin = async () => {
    if (typeof window === "undefined") return

    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/perfil`,
      },
    })
  }

  /* =========================
     LOGOUT SEGURO
  ========================== */

  const handleLogout = async () => {
    await supabase.auth.signOut()

    setUser(null)
    setMinecraftUsername(null)

    router.push("/")      // Redirige al inicio
    router.refresh()      // Refresca estado
  }

  const minecraftHead = minecraftUsername || "Steve"

  return (
    <nav className="flex justify-between items-center px-12 py-5 bg-[#0f0f0f] border-b border-[#1f1f1f] text-white">

      {/* IZQUIERDA */}
      <div className={`flex items-center gap-10 ${pressStart.className} text-xs tracking-wider`}>

        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Prysmania Logo"
            className="h-14 w-14 object-contain rounded-full"
          />
        </Link>

        <Link href="/" className="hover:text-yellow-400 transition">
          INICIO
        </Link>

        <Link href="/sanciones" className="hover:text-yellow-400 transition">
          SANCIONES
        </Link>

        <Link href="/votaciones" className="hover:text-yellow-400 transition">
          VOTACIONES
        </Link>

      </div>

      {/* DERECHA */}
      <div className={`flex items-center gap-6 ${pressStart.className} text-xs`}>

        {!user ? (
          <button
            onClick={handleDiscordLogin}
            className="
              cursor-pointer
              bg-[#5865F2] text-white
              px-8 py-3
              border-2 border-[#4752c4]
              shadow-[0_4px_0_#2c2f91]
              hover:shadow-[0_6px_0_#2c2f91]
              hover:-translate-y-1
              active:translate-y-1 active:shadow-[0_2px_0_#2c2f91]
              transition-all duration-150
            "
          >
            INICIAR SESIÓN
          </button>
        ) : (
          <>
            <Link
              href="/perfil"
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <img
                src={`https://mc-heads.net/avatar/${minecraftHead}`}
                className="w-8 h-8"
              />
              <span>MI CUENTA</span>
            </Link>

            <button
              onClick={handleLogout}
              className="
                cursor-pointer
                bg-red-600 text-white
                px-8 py-3
                border-2 border-red-700
                shadow-[0_4px_0_#7f1d1d]
                hover:shadow-[0_6px_0_#7f1d1d]
                hover:-translate-y-1
                active:translate-y-1 active:shadow-[0_2px_0_#7f1d1d]
                transition-all duration-150
              "
            >
              CERRAR SESIÓN
            </button>
          </>
        )}

      </div>
    </nav>
  )
}
