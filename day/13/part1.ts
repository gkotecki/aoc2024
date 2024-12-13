import { textInput } from '../../shared.ts'

type Coord = { x: number; y: number }

const machines = textInput.split('\n\n').map((machine) =>
  machine.split('\n').map((line, ix) => {
    const data = line.split(': ')[1].split(', ')
    if (ix === 0) return { x: +data[0].slice(2), y: +data[1].slice(2) }
    else if (ix === 1) return { x: +data[0].slice(2), y: +data[1].slice(2) }
    else return { x: +data[0].slice(2), y: +data[1].slice(2) }
  }),
)

console.log({ machines })

const aCost = 3
const bCost = 1

let totalTokens = 0

for (const [a, b, prize] of machines) {
  const memo = new Map<string, number>()

  const navigate = (
    currentX: number,
    currentY: number,
    currentCost: number,
    pressCount: number,
    next: Coord,
    nextCost: number,
    goal: Coord,
  ): number => {
    const key = `${currentX}-${currentY}-${currentCost}-${next.x}-${next.y}-${nextCost}`
    if (memo.has(key)) return memo.get(key)!

    // if (pressCount > 100) return Infinity
    if (currentX === goal.x && currentY === goal.y) return currentCost
    if (currentX > goal.x || currentY > goal.y) return Infinity

    currentX += next.x
    currentY += next.y
    currentCost += nextCost
    pressCount += 1

    const costFromA = navigate(currentX, currentY, currentCost, pressCount, a, aCost, prize)
    const costFromB = navigate(currentX, currentY, currentCost, pressCount, b, bCost, prize)

    memo.set(key, Math.min(costFromA, costFromB))
    return Math.min(costFromA, costFromB)
  }

  const costFromB = navigate(0, 0, 0, 0, b, bCost, prize)
  const costFromA = navigate(0, 0, 0, 0, a, aCost, prize)

  console.log({ costFromA, costFromB })

  const accr = Math.min(costFromA, costFromB)
  if (accr < Infinity) totalTokens += accr
}

console.log({ totalTokens }) // 480