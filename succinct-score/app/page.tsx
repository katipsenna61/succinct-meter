"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

const questions = [
  {
    question: "When was Succinct founded?",
    options: ["2021", "2022", "2023", "2024"],
    answer: "2022",
  },
  {
    question: "How many weeks did Stage 1 last?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "How many have ALL IN SUCCINCT role?",
    options: ["15", "30", "45", "60"],
    answer: "15",
  },
  {
    question:
      "Who published a research paper on graph theory and combinatorics at MIT PRIMES in 2015 at the age of just 17?",
    options: ["Nair Advaith", "John Guibas", "Uma Roy", "crashout"],
    answer: "Uma Roy",
  },
]

export default function Page() {
  const [stars, setStars] = useState(0)
  const [proofs, setProofs] = useState(0)
  const [stage2_5, setStage2_5] = useState(false)
  const [roles, setRoles] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [totalScore, setTotalScore] = useState<number | null>(null)

  const calculateScore = () => {
    let score = 0
    score += Math.min((stars / 250_000_000) * 20, 20)
    score += Math.min((proofs / 77_000) * 40, 40)
    if (stage2_5) score += 10
    score += Math.min(roles.length * 2.5, 10)
    score += answers.filter((a, i) => a === questions[i].answer).length * 5

    const final = Math.round(score)
    setTotalScore(final)

    if (final >= 90) {
      confetti()
    }
  }

  const getTitle = (score: number | null) => {
    if (score === null) return ""
    if (score >= 90) return "ALL IN SUCCINCT"
    if (score >= 70) return "Seasoned Prover"
    if (score >= 50) return "Proof Enjoyer"
    if (score >= 30) return "Testnet Tourist"
    return "Discord Lurker"
  }

  const toggleRole = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Succinct Score Calculator</h1>

      <div className="grid gap-4">
        <input
          type="number"
          placeholder="Stage 1 - Star count"
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Stage 2 - Proof count"
          value={proofs}
          onChange={(e) => setProofs(Number(e.target.value))}
          className="p-2 border rounded w-full"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={stage2_5}
            onChange={() => setStage2_5(!stage2_5)}
          />
          Included in Stage 2.5
        </label>

        <div>
          <p className="font-medium mb-1">Discord Roles</p>
          {[
            "Proof Verified",
            "PROVED UR LUV",
            "L2",
            "L3",
            "DOPE",
            "ALL IN SUCCINCT",
          ].map((role) => (
            <label
              key={role}
              className={`inline-block px-3 py-1 mr-2 mb-2 rounded-full border cursor-pointer text-sm transition ${
                roles.includes(role)
                  ? "bg-green-100 border-green-500 ring-1 ring-green-400"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={roles.includes(role)}
                onChange={() => toggleRole(role)}
                className="mr-1 hidden"
              />
              {roles.includes(role) ? "✅ " : ""} {role}
            </label>
          ))}
        </div>

        <div className="space-y-4 mt-4">
          {questions.map((q, i) => (
            <div key={i}>
              <p className="font-medium">{q.question}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      const updated = [...answers]
                      updated[i] = option
                      setAnswers(updated)
                    }}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      answers[i] === option
                        ? "bg-green-200 border-green-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={calculateScore}
          className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 active:scale-95 transition-transform duration-200 mt-4"
        >
          Calculate Score
        </button>

        {totalScore !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-6"
          >
            <h2 className="text-5xl font-bold text-green-600">{totalScore}</h2>
            <p className="text-sm text-gray-500 mt-1">Your Succinct Score</p>

            <span className="mt-3 inline-block px-4 py-1 rounded-full text-sm font-semibold
              ${
                totalScore >= 90
                  ? "bg-yellow-300 text-black"
                  : totalScore >= 70
                  ? "bg-blue-200 text-blue-800"
                  : "bg-gray-200 text-gray-600"
              }
            ">
              {getTitle(totalScore)}
            </span>

            <div className="flex justify-center gap-2 mt-4">
              <a
                href={`https://twitter.com/intent/tweet?text=I just scored ${totalScore} points on the Succinct Score App! ${getTitle(
                  totalScore
                )} 💥 Try it yourself at https://your-app-url.vercel.app`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Share on X 🐦
              </a>
              <button
                onClick={() => {
                  const text = `I just scored ${totalScore} on the Succinct Score App! ${getTitle(
                    totalScore
                  )} 💥 Try it yourself at https://your-app-url.vercel.app`
                  navigator.clipboard.writeText(text)
                  alert("Copied to clipboard! 📋")
                }}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Copy share text 📋
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
