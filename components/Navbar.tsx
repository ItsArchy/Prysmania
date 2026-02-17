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
        await ensureProfile(currentUser)
        await loadMinecraft(currentUser.id)
      }
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          await ensureProfile(currentUser)
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

    if (data?.minecraft_username) {
      setMinecraftUsername(data.minecraft_username)
    } else {
      setMinecraftUsername(null)
    }
  }

  /* =========================
     CREAR / ACTUALIZAR PERFIL
  ========================== */

  const ensureProfile = async (currentUser: any) => {
    const discordIdentity = currentUser.identities?.find(
      (i: any) => i.provider === "discord"
    )

    if (!discordIdentity) return

    const discordId = discordIdentity.identity_data?.sub || null

    const discordUsername =
      discordIdentity.identity_data?.global_name ||
      discordIdentity.identity_data?.username ||
      null

    const discordAvatar =
      discordIdentity.identity_data?.avatar || null

    await supabase.from("profiles").upsert({
      id: currentUser.id,
      discord_id: discordId,
      discord_username: discordUsername,
      discord_avatar: discordAvatar,
    })
  }

  /* =========================
     LOGIN DISCORD
  ========================== */

  const handleDiscordLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: "http://localhost:3000/perfil",
      },
    })
  }

  /* =========================
     LOGOUT
  ========================== */

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const minecraftHead = minecraftUsername || "Steve"

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#0f0f0f] border-b border-[#1f1f1f] text-white">

      <Link href="/" className="font-bold text-xl text-yellow-400">
        Prysmania
      </Link>

      <div className="flex items-center gap-6">

        <Link href="/">Inicio</Link>

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
