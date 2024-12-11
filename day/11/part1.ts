import { textInput } from '../../shared.ts'

const stones = textInput.split(' ').map(Number)

let lastArrangement = stones
for (let blinkCount = 0; blinkCount < 25; blinkCount++) {
  const newArrangement: number[] = []

  for (const stone of lastArrangement) {
    const stoneStr = stone.toString()
    if (stone === 0) {
      newArrangement.push(1)
    } else if (stoneStr.length % 2 === 0) {
      const half = stoneStr.length / 2
      const left = stoneStr.slice(0, half)
      const right = stoneStr.slice(half)
      newArrangement.push(Number(left))
      newArrangement.push(Number(right))
    } else {
      newArrangement.push(stone * 2024)
    }
  }

  console.log({ count: newArrangement.length })
  lastArrangement = newArrangement
}

console.log('\n',{ countOk: lastArrangement.length === 172484 })