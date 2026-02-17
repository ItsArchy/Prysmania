"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Perfil() {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [minecraftUsername, setMinecraftUsername] = useState("")
  const [minecraftUUIDFull, setMinecraftUUIDFull] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [loading, setLoading] = useState(true)

  /* =========================
     INIT PERFIL (SOLO LECTURA)
  ========================== */

  useEffect(() => {
    const loadProfile = async () => {
      const { data: authData } = await supabase.auth.getUser()

      if (!authData.user) {
        router.push("/")
        return
      }

      setUser(authData.user)

      const { data: profile } = await supabase
        .from("profiles")
        .select("minecraft_username, minecraft_uuid_full")
        .eq("id", authData.user.id)
        .single()

      if (profile) {
        setMinecraftUsername(profile.minecraft_username || "")
        setMinecraftUUIDFull(profile.minecraft_uuid_full || "")
      }

      setLoading(false)
    }

    loadProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
        Cargando perfil...
      </div>
    )
  }

  if (!user) return null

  /* =========================
     DISCORD INFO
  ========================== */

  const discordIdentity = user.identities?.find(
    (i: any) => i.provider === "discord"
  )

  const discordId = discordIdentity?.identity_data?.sub || ""
  const discordAvatarHash =
    discordIdentity?.identity_data?.avatar || ""

  const discordName =
    discordIdentity?.identity_data?.global_name ||
    discordIdentity?.identity_data?.username ||
    user.user_metadata?.name ||
    "Usuario"

  const discordAvatar =
    discordId && discordAvatarHash
      ? `https://cdn.discordapp.com/avatars/${discordId}/${discordAvatarHash}.png`
      : `https://cdn.discordapp.com/embed/avatars/0.png`

  const previewUsername = newUsername || minecraftUsername || "Steve"

  /* =========================
     GUARDAR MINECRAFT
  ========================== */

  const handleSaveUsername = async () => {
    if (minecraftUsername) return

    if (!newUsername || !/^[a-zA-Z0-9_]{3,16}$/.test(newUsername)) {
      alert("Nombre Minecraft inválido")
      return
    }

    try {
      const res = await fetch(
        `https://api.ashcon.app/mojang/v2/user/${newUsername}`
      )

      if (!res.ok) {
        alert("Usuario Minecraft no válido")
        return
      }

      const data = await res.json()
      const uuidFull = data.uuid

      const { error } = await supabase
        .from("profiles")
        .update({
          minecraft_username: newUsername,
          minecraft_uuid_full: uuidFull,
        })
        .eq("id", user.id)

      if (error) {
        alert("Error guardando usuario")
        return
      }

      setMinecraftUsername(newUsername)
      setMinecraftUUIDFull(uuidFull)
    } catch {
      alert("Error verificando usuario")
    }
  }

  /* =========================
     UI
  ========================== */

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8">
      <div className="max-w-xl mx-auto bg-[#1a1a1a] p-8 rounded-xl">

        {/* HEADER DISCORD */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={discordAvatar}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {discordName}
            </h1>
            <p className="text-gray-400 text-sm">
              Discord ID: {discordId}
            </p>
          </div>
        </div>

        {/* MINECRAFT INFO */}
        <div className="mb-6">
          <div className="flex items-center gap-4 bg-black p-4 rounded">
            <img
              src={`https://mc-heads.net/avatar/${previewUsername}`}
              className="w-14 h-14 rounded"
            />
            <div>
              <p className="text-lg">
                {minecraftUsername || "No configurado"}
              </p>

              {minecraftUUIDFull && (
                <div className="mt-3">
                  <p className="text-gray-400 text-xs">
                    UUID:
                  </p>
                  <p className="text-green-400 text-sm font-mono break-all">
                    {minecraftUUIDFull}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {!minecraftUsername && (
          <div className="mt-6 bg-[#111] p-6 rounded border border-yellow-500 text-center">
            <div className="mb-4 p-4 bg-yellow-600 text-black rounded font-bold">
              Solo puede conectar su usuario Minecraft una única vez.
              Asegúrese de escribirlo exactamente como es.
            </div>

            <input
              type="text"
              value={newUsername}
              placeholder="Ingrese su usuario Minecraft"
              className="w-full p-3 bg-black border border-gray-700 mb-4"
              onChange={(e) => {
                const value = e.target.value
                if (/^[a-zA-Z0-9_]{0,16}$/.test(value)) {
                  setNewUsername(value)
                }
              }}
            />

            <button
              onClick={handleSaveUsername}
              className="bg-yellow-500 text-black w-full py-2 rounded font-bold"
            >
              Conectar usuario Minecraft
            </button>
          </div>
        )}

        {minecraftUsername && (
          <div className="mt-6 p-4 bg-[#111] border border-gray-700 rounded text-sm text-[#ba0000]">
            Para cambiar su usuario Minecraft o desactivar su cuenta,
            debe abrir un ticket en nuestro servidor de Discord (
            <a
              href="https://discord.prysmania.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold hover:opacity-80"
            >
              discord.prysmania.com
            </a>
            ).
          </div>
        )}

      </div>
    </div>
  )
}
