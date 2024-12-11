import { textInput } from '../../shared.ts'

const now = performance.now()
const stones = textInput.split(' ').map(Number)
const totalBlinks = 75
let totalCount = 0

const memo = new Map<string, number>()

function parseStone(stone: number, currentBlink: number): number {
  const key = `${stone}-${currentBlink}`

  if (memo.has(key)) return memo.get(key)!
  if (currentBlink > totalBlinks) return 1

  const nextBlink = currentBlink + 1
  const stoneStr = stone.toString()
  let count = 0

  if (stone === 0) {
    count = parseStone(1, nextBlink)
  } else if (stoneStr.length % 2 === 0) {
    const half = stoneStr.length / 2
    const left = stoneStr.slice(0, half)
    const right = stoneStr.slice(half)
    count = parseStone(Number(left), nextBlink) + parseStone(Number(right), nextBlink)
  } else {
    count = parseStone(stone * 2024, nextBlink)
  }

  memo.set(key, count)
  return count
}

for (const stone of stones) {
  console.log('\ncounting stone', stone)
  console.log({ totalCount })
  totalCount += parseStone(stone, 1)
}

// console.log('\n', { totalCount, countOk: totalCount === 55312 }) // example, for 25 blinks
console.log('\n', { totalCount, countOk: totalCount === 172484 }) // real, for 25 blinks
console.log('time', performance.now() - now)
