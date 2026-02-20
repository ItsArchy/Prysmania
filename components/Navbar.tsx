"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Press_Start_2P } from "next/font/google"
import { useRouter } from "next/navigation"

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
})

export default function Navbar() {

  const [user, setUser] = useState<any>(null)
  const [minecraftUsername, setMinecraftUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const session = supabase.auth.getSession()

    session.then(({ data }) => {
      const currentUser = data.session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        loadMinecraft(currentUser.id)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const loadMinecraft = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("minecraft_username")
      .eq("id", userId)
      .single()

    setMinecraftUsername(data?.minecraft_username || null)
  }

  const handleDiscordLogin = async () => {
    if (typeof window === "undefined") return

    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/perfil`,
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMinecraftUsername(null)
    router.push("/")
  }

  const minecraftHead = minecraftUsername || "Steve"

  return (
    <nav className="fixed top-0 left-0 w-full z-50 
                    flex justify-between items-center 
                    px-25 py-5 
                    bg-[#0f0f0f] 
                    border-b border-[#1f1f1f] 
                    text-white">

      <div className={`flex items-center gap-10 ${pressStart.className} text-xs tracking-wider`}>
        <Link href="/" className="flex items-center cursor-pointer">
          <img src="/logo.png" className="h-12 w-12 object-contain rounded-full" />
        </Link>

        <Link href="/" className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
          INICIO
        </Link>

        <Link href="/sanciones" className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
          SANCIONES
        </Link>

        <Link href="/votaciones" className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
          VOTACIONES
        </Link>

        <Link href="/reportes" className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
          REPORTES
        </Link>

        <Link href="/faq" className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
          FAQ
        </Link>
      </div>

      <div className={`flex items-center gap-6 ${pressStart.className} text-xs`}>
        {!user ? (
          <button
            onClick={handleDiscordLogin}
            className="cursor-pointer bg-[#5865F2] text-white px-8 py-3 border-2 border-[#4752c4]
                       shadow-[0_4px_0_#2c2f91] hover:shadow-[0_6px_0_#2c2f91]
                       hover:-translate-y-1 active:translate-y-1 
                       active:shadow-[0_2px_0_#2c2f91] transition-all duration-150">
            INICIAR SESIÓN
          </button>
        ) : (
          <>
            <Link
              href="/perfil"
              className="flex items-center gap-3 
                         bg-[#1a1a1a] 
                         px-4 py-2 
                         border border-[#2a2a2a] 
                         rounded-lg
                         hover:border-yellow-500 
                         hover:bg-[#202020]
                         transition duration-200
                         cursor-pointer"
            >
              <img
                src={`https://mc-heads.net/avatar/${minecraftHead}`}
                className="w-8 h-8"
              />
              <span>MI CUENTA</span>
            </Link>

            <button
              onClick={handleLogout}
              className="cursor-pointer bg-red-600 text-white px-8 py-3 border-2 border-red-700
                         shadow-[0_4px_0_#7f1d1d] hover:shadow-[0_6px_0_#7f1d1d]
                         hover:-translate-y-1 active:translate-y-1 
                         active:shadow-[0_2px_0_#7f1d1d] transition-all duration-150">
              CERRAR SESIÓN
            </button>
          </>
        )}
      </div>

    </nav>
  )
}
