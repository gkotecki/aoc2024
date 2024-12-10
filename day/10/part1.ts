import { textInput } from '../../shared.ts'

const matrix = textInput.split('\n').map((line) => line.split('').map(Number))

///////////////////// visualization block /////////////////////
const colorScale = [
  '\x1b[48;5;196m', // Bright red
  '\x1b[48;5;202m', // Orange-red
  '\x1b[48;5;208m', // Orange
  '\x1b[48;5;220m', // Yellow
  '\x1b[48;5;190m', // Yellow-green
  '\x1b[48;5;46m', // Green
  '\x1b[48;5;39m', // Light blue
  '\x1b[48;5;27m', // Medium blue
  '\x1b[48;5;21m', // Blue
  '\x1b[48;5;17m', // Dark blue
]
matrix.forEach((row) => {
  const paintedRow = row
    .map((cell) => (cell >= 0 ? `${colorScale[cell]} ${cell} ` : `\x1b[48;5;255m   `))
    .join('')
  console.log(paintedRow)
})
console.log('\x1b[0m') // reset
///////////////////// visualization block /////////////////////

function navigateTrail(l: number, c: number, height: number): string[] {
  if (l < 0 || l >= matrix.length || c < 0 || c >= matrix[0].length) return []
  if (matrix[l][c] !== height) return []
  if (height === 9) return [`${l},${c}`]
  return [
    ...navigateTrail(l - 1, c, height + 1), // up
    ...navigateTrail(l + 1, c, height + 1), // down
    ...navigateTrail(l, c + 1, height + 1), // right
    ...navigateTrail(l, c - 1, height + 1), // left
  ]
}

let total = 0
for (let l = 0; l < matrix.length; l++) {
  for (let c = 0; c < matrix[0].length; c++) {
    if (matrix[l][c] === 0) {
      const coords = navigateTrail(l, c, 0)
      const localSet = new Set(coords)
      console.log([l, c], localSet)
      total += localSet.size
    }
  }
}

console.log({ total })
