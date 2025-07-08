'use client';

import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    q: "When was Succinct founded?",
    options: ["2019", "2020", "2021", "2022"],
    answer: "2022"
  },
  {
    q: "How many weeks did Stage 1 last?",
    options: ["17", "18", "19", "20"],
    answer: "20"
  },
  {
    q: "How many people have the ALL IN SUCCINCT role?",
    options: ["12", "13", "14", "15"],
    answer: "15"
  },
  {
    q: "Who published a graph theory paper at MIT PRIMES in 2015 at the age of 17?",
    options: ["Nair Advaith", "John Guibas", "Uma Roy", "crashout"],
    answer: "Uma Roy"
  }
];

export default function Home() {
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
    setTotalScore(Math.round(score))
  }

  const getTitle = (score: number) => {
    if (score >= 90) return "ALL IN SUCCINCT 🥇"
    if (score >= 70) return "Seasoned Prover 🧠"
    if (score >= 50) return "Proof Enjoyer 🙃"
    if (score >= 30) return "Testnet Tourist 🧪"
    return "Discord Lurker 👀"
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Star sayısı"
          className="border p-2 rounded w-full"
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Proof sayısı"
          className="border p-2 rounded w-full"
          value={proofs}
          onChange={(e) => setProofs(Number(e.target.value))}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={stage2_5}
            onChange={() => setStage2_5(!stage2_5)}
            className="w-5 h-5 border rounded appearance-none checked:bg-green-400 checked:border-green-600"
          />
          <span>Stage 2.5'e seçildim ✅</span>
        </label>

        <div>
          <p className="font-medium mb-1">Discord Rollerini Seç:</p>
          {[
            "PROVED UR LUV",
            "Level 2",
            "Level 3",
            "DOPE",
            "ALL IN SUCCINCT"
          ].map((role) => (
            <label key={role} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={roles.includes(role)}
                onChange={() =>
                  setRoles((prev) =>
                    prev.includes(role)
                      ? prev.filter((r) => r !== role)
                      : [...prev, role]
                  )
                }
              />
              <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                {role}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={idx} className="p-4 bg-gray-100 rounded-xl">
            <p className="font-semibold mb-2">{q.q}</p>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    const updated = [...answers]
                    updated[idx] = option
                    setAnswers(updated)
                  }}
                  className={`px-3 py-1 rounded-xl border ${
                    answers[idx] === option
                      ? "bg-blue-300 border-blue-500"
                      : "bg-gray-100 border-gray-300"
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
        className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 active:scale-95 transition-transform duration-200"
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
          <h1 className="text-5xl font-bold text-green-600">
            {totalScore}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Your Succinct Score</p>
          <p className="mt-2 text-xl">{getTitle(totalScore)}</p>

          <a
            href={`https://twitter.com/intent/tweet?text=I just scored ${totalScore} points on the Succinct Score App! ${getTitle(
              totalScore
            )} 💥 Try it yourself at https://your-app-url.vercel.app`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Share on X 🐦
          </a>
        </motion.div>
      )}
    </div>
  )
}