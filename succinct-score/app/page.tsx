'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const TOTAL_STARS = 250_000_000
const TOTAL_PROOFS = 77_000

const roles = [
  { name: 'Proof Verified' },
  { name: 'PROVED UR LUV' },
  { name: 'Level 2 (L2)' },
  { name: 'Level 3 (L3)' },
  { name: 'DOPE / ALL IN SUCCINCT' }
]

const questions = [
  {
    question: 'Who published a paper on graph theory at 17?',
    options: ['Uma Roy', 'Vitalik Buterin', 'Maryam Mirzakhani', 'Dan Boneh'],
    answer: 'Uma Roy'
  },
  {
    question: 'Which layer does Succinct focus on?',
    options: ['L1', 'L2', 'L3', 'Proof Layer'],
    answer: 'Proof Layer'
  },
  {
    question: 'What’s the name of Succinct’s proving system?',
    options: ['HotShot', 'Zebra', 'Boundless', 'Nova'],
    answer: 'Boundless'
  },
  {
    question: 'What kind of contests did Succinct run?',
    options: ['Design', 'Proof', 'Staking', 'Governance'],
    answer: 'Proof'
  }
]

export default function Home() {
  const [stars, setStars] = useState(0)
  const [proofs, setProofs] = useState(0)
  const [stage25, setStage25] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>(Array(4).fill(''))
  const [totalScore, setTotalScore] = useState<number | null>(null)

  const calculateScore = () => {
    const starScore = Math.min((stars / TOTAL_STARS) * 20, 20)
    const proofScore = Math.min((proofs / TOTAL_PROOFS) * 40, 40)
    const stage25Score = stage25 ? 10 : 0

    const roleCount = selectedRoles.length
    const maxRoleScore = Math.min(roleCount * 2, 10) // 5 role → 2 puan → max 10

    const quizScore = questions.reduce((sum, q, i) => {
      return sum + (answers[i] === q.answer ? 5 : 0)
    }, 0)

    setTotalScore(Math.round(starScore + proofScore + stage25Score + maxRoleScore + quizScore))
  }

  const getTitle = (score: number | null) => {
    if (score === null) return ''
    if (score >= 90) return 'Truth Architect'
    if (score >= 70) return 'OG Prover'
    if (score >= 50) return 'Proof Explorer'
    if (score >= 31) return 'Proof Tourist'
    return 'Ghost Prover'
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Succinct Contribution Score</h1>

      <div>
        <label>⭐ Stage 1 - Star count:</label>
        <input type="number" className="input" value={stars} onChange={e => setStars(Number(e.target.value))} />
      </div>

      <div>
        <label>🧾 Stage 2 - Proof count:</label>
        <input type="number" className="input" value={proofs} onChange={e => setProofs(Number(e.target.value))} />
      </div>

      <div>
        <label>
          <input type="checkbox" checked={stage25} onChange={e => setStage25(e.target.checked)} />
          ✅ Selected for Stage 2.5
        </label>
      </div>

      <div>
        <p className="mb-2">🎖️ Discord Roles:</p>
        <div className="flex flex-wrap gap-2">
          {roles.map(role => (
            <label key={role.name} className={`border rounded-xl px-3 py-1 cursor-pointer ${selectedRoles.includes(role.name) ? 'bg-green-200' : 'bg-gray-100'}`}>
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedRoles.includes(role.name)}
                onChange={() =>
                  setSelectedRoles(prev =>
                    prev.includes(role.name) ? prev.filter(r => r !== role.name) : [...prev, role.name]
                  )
                }
              />
              ✅ {role.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">🧠 Succinct Quiz</p>
        {questions.map((q, idx) => (
          <div key={idx} className="mb-4">
            <p>{q.question}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {q.options.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    const newAnswers = [...answers]
                    newAnswers[idx] = option
                    setAnswers(newAnswers)
                  }}
                  className={`px-3 py-1 rounded-xl border ${answers[idx] === option ? 'bg-blue-300' : 'bg-gray-100'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={calculateScore} className="bg-black text-white px-4 py-2 rounded-xl">
        Calculate Score
      </button>

      {totalScore !== null && (
        <motion.div
          className="mt-6 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg">Your Succinct Score:</p>
          <motion.h1 className="text-5xl font-bold text-green-600" animate={{ scale: [1, 1.3, 1] }}>
            {totalScore}
          </motion.h1>
          <p className="mt-2 text-xl">{getTitle(totalScore)}</p>
        </motion.div>
      )}
    </div>
  )
}
