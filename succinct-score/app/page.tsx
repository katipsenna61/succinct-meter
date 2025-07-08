'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function Home() {
  const [stars, setStars] = useState(0)
  const [proofs, setProofs] = useState(0)
  const [isStage2_5, setIsStage2_5] = useState(false)
  const [discordRoles, setDiscordRoles] = useState<string[]>([])
  const [score, setScore] = useState<number | null>(null)

  const rolePoints: Record<string, number> = {
    luv: 6,
    l2: 5,
    l3: 5,
    dope: 4
  }

  const toggleRole = (role: string) => {
    setDiscordRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    )
  }

  const calculateScore = () => {
    let total = 0

    // Stars: max 20
    total += Math.min((stars / 20000) * 20, 20)

    // Proofs: max 30
    total += Math.min((proofs / 50) * 30, 30)

    // Stage 2.5: 10 puan
    if (isStage2_5) total += 10

    // Discord roller: max 20
    const roleSum = discordRoles.reduce((sum, r) => sum + (rolePoints[r] || 0), 0)
    total += Math.min(roleSum, 20)

    setScore(Math.round(total))
  }

  const getTitle = () => {
    if (score === null) return ""
    if (score >= 90) return "🧠 Truth Architect"
    if (score >= 70) return "🧪 OG Prover"
    if (score >= 50) return "🧭 Proof Explorer"
    if (score >= 31) return "🌫️ Proof Tourist"
    return "👻 Ghost Prover"
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-8 gap-8">
      <h1 className="text-4xl font-bold text-center">Ne Kadar Succinct’sin?</h1>

      <div className="grid gap-4 w-full max-w-md">
        <div>
          <Label htmlFor="stars">⭐ Star sayısı</Label>
          <Input id="stars" type="number" value={stars} onChange={e => setStars(+e.target.value)} />
        </div>

        <div>
          <Label htmlFor="proofs">🧾 Proof sayısı</Label>
          <Input id="proofs" type="number" value={proofs} onChange={e => setProofs(+e.target.value)} />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="stage2_5" checked={isStage2_5} onCheckedChange={val => setIsStage2_5(!!val)} />
          <Label htmlFor="stage2_5">Stage 2.5'e seçildim</Label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "luv", label: "💖 LUV" },
            { id: "l2", label: "⚡ Level 2" },
            { id: "l3", label: "🧪 Level 3" },
            { id: "dope", label: "🔥 DOPE / ALL IN" },
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={discordRoles.includes(id)}
                onCheckedChange={() => toggleRole(id)}
              />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
        </div>

        <Button onClick={calculateScore}>Skorumu Hesapla</Button>
      </div>

      {score !== null && (
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-2xl mb-2">Succinct Skorun:</p>
          <motion.div
            className="text-5xl font-bold text-green-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {score} / 100
          </motion.div>
          <p className="text-2xl mt-4">{getTitle()}</p>
        </motion.div>
      )}
    </main>
  )
}
