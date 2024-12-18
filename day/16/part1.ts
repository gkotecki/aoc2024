import { printMatrix, textInput } from '../../shared.ts'

const matrix = textInput.split('\n').map((line) => line.split(''))

const start = matrix
  .flatMap((row, r) => row.map((cell, c) => ({ cell, r, c })))
  .find(({ cell }) => cell === 'S')!

const end = matrix
  .flatMap((row, r) => row.map((cell, c) => ({ cell, r, c })))
  .find(({ cell }) => cell === 'E')!

const startStr = `${start.r},${start.c}`
const endStr = `${end.r},${end.c}`

printMatrix(matrix)

console.log({ start, end })

function getNeighbors([r, c]: [number, number]) {
  const neighbors: [number, number][] = []
  if (matrix[r + 1][c] !== '#') neighbors.push([r + 1, c])
  if (matrix[r - 1][c] !== '#') neighbors.push([r - 1, c])
  if (matrix[r][c + 1] !== '#') neighbors.push([r, c + 1])
  if (matrix[r][c - 1] !== '#') neighbors.push([r, c - 1])
  return neighbors
}

const frontier: [number, number][] = []
frontier.push([start.r, start.c])

const cameFrom = new Map<string, string | undefined>()
cameFrom.set(startStr, undefined)

while (frontier.length > 0) {
  const current = frontier.shift()!
  for (const next of getNeighbors(current)) {
    if (!cameFrom.has(`${next[0]},${next[1]}`)) {
      frontier.push(next)
      cameFrom.set(`${next[0]},${next[1]}`, `${current[0]},${current[1]}`)
    }
  }
}

const path: string[] = []
let current = endStr
while (true) {
  path.push(current)
  current = cameFrom.get(current)!
  if (current === startStr) {
    break
  }
}

console.log(path.length)

matrix.forEach((row, r) => {
  row.forEach((cell, c) => {
    if (path.includes(`${r},${c}`)) matrix[r][c] = ','
  })
})

printMatrix(matrix)