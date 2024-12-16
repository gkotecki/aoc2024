import { textInput } from '../../shared.ts'

const robots = textInput
  .split('\n')
  .map((line) => line.split(' ').map((str) => str.slice(2).split(',').map(Number)))

// const [rows, cols] = [7, 11] // example
const [rows, cols] = [103, 101] // full

const matrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))

let iteration = 0

while (true) {
  iteration += 1

  const newMatrix = structuredClone(matrix)

  for (const [[_px, _py], [vx, vy]] of robots) {
    let px = (_px + vx * iteration) % cols
    let py = (_py + vy * iteration) % rows
    if (px < 0) px += cols
    if (py < 0) py += rows
    newMatrix[py][px] += 1
  }

  let checkMatrix = false
  for (const line of newMatrix) {
    let max = 0
    let consecutive = 0
    for (const cell of line) {
      if (cell > 0) consecutive += 1
      else consecutive = 0
      max = Math.max(max, consecutive)
    }
    if (max >= 8) {
      checkMatrix = true
      break
    }
  }
  if (checkMatrix) {
    console.log({ iteration })
    printMatrix(newMatrix)
    console.log({ iteration })
    break
  }
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
