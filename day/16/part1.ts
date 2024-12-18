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

const costSoFar = new Map<string, number>()
costSoFar.set(startStr, 0)

while (frontier.length > 0) {
  const current = frontier.shift()!

  if (`${current[0]},${current[1]}` === endStr) break

  for (const next of getNeighbors(current)) {
    const nextStr = `${next[0]},${next[1]}`
    let newCost = costSoFar.get(`${current[0]},${current[1]}`)! + 1

    if (!costSoFar.has(nextStr) || newCost < costSoFar.get(nextStr)!) {
      frontier.push(next)
      costSoFar.set(nextStr, newCost)
      cameFrom.set(nextStr, `${current[0]},${current[1]}`)
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
    if (['E', 'S'].includes(matrix[r][c])) return
    if (path.includes(`${r},${c}`)) matrix[r][c] = ','
    // if (![',', 'E', 'S'].includes(matrix[r][c]) && costSoFar.has(`${r},${c}`))
    //   matrix[r][c] = costSoFar.get(`${r},${c}`)!.toString()
  })
})

printMatrix(matrix)
