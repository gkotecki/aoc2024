import { textInput } from '../../shared.ts'

const robots = textInput
  .split('\n')
  .map((line) => line.split(' ').map((str) => str.slice(2).split(',').map(Number)))

const iterations = 100
// const [rows, cols] = [7, 11] // example
const [rows, cols] = [103, 101] // full

const matrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))

for (const [[_px, _py], [vx, vy]] of robots) {
  let px = (_px + vx * iterations) % cols
  let py = (_py + vy * iterations) % rows
  if (px < 0) px += cols
  if (py < 0) py += rows
  console.log({ px, py })
  matrix[py][px] += 1
}

/////////////////// visualization block /////////////////////
function printMatrix(matrix: number[][]) {
  const uniqueChars = new Set(matrix.flat())
  const colorMap = new Map(
    Array.from(uniqueChars).map((char, index) => [char, `\x1b[48;5;${index + 0}m`]),
  )
  matrix.forEach((row) => {
    const paintedRow = row.map((cell) => `${colorMap.get(cell)} ${cell} `).join('')
    console.log(paintedRow)
  })
  console.log('\x1b[0m') // reset
}
/////////////////// visualization block /////////////////////

// printMatrix(matrix)

const quadrantA = matrix.slice(0, (rows / 2) | 0).map((row) => row.slice(0, (cols / 2) | 0))
const quadrantB = matrix.slice(0, (rows / 2) | 0).map((row) => row.slice(cols / 2 + 1))
const quadrantC = matrix.slice(rows / 2 + 1).map((row) => row.slice(0, (cols / 2) | 0))
const quadrantD = matrix.slice(rows / 2 + 1).map((row) => row.slice(cols / 2 + 1))

// printMatrix(quadrantA)
// printMatrix(quadrantB)
// printMatrix(quadrantC)
// printMatrix(quadrantD)

const getCount = (quadrant: number[][]) => quadrant.flat().reduce((acc, cell) => acc + cell, 0)

console.log({
  quadrantA: getCount(quadrantA),
  quadrantB: getCount(quadrantB),
  quadrantC: getCount(quadrantC),
  quadrantD: getCount(quadrantD),
})

console.log({
  mult: getCount(quadrantA) * getCount(quadrantB) * getCount(quadrantC) * getCount(quadrantD),
})
