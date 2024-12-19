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

type Direction = 'up' | 'down' | 'left' | 'right'
const directionCost = {
  up: { up: 0, down: 2000, left: 1000, right: 1000 },
  down: { up: 2000, down: 0, left: 1000, right: 1000 },
  left: { up: 1000, down: 1000, left: 0, right: 2000 },
  right: { up: 1000, down: 1000, left: 2000, right: 0 },
}

function getNeighbors([r, c]: [number, number], direction: Direction) {
  const neighbors: [number, number, Direction, number][] = []
  if (matrix[r + 1][c] !== '#') neighbors.push([r + 1, c, 'down', directionCost[direction].down])
  if (matrix[r - 1][c] !== '#') neighbors.push([r - 1, c, 'up', directionCost[direction].up])
  if (matrix[r][c + 1] !== '#') neighbors.push([r, c + 1, 'right', directionCost[direction].right])
  if (matrix[r][c - 1] !== '#') neighbors.push([r, c - 1, 'left', directionCost[direction].left])
  return neighbors
}

const frontier: [number, number, Direction][] = []
frontier.push([start.r, start.c, 'right'])

const cameFrom = new Map<string, string | undefined>()
cameFrom.set(startStr, undefined)

const costSoFar = new Map<string, number>()
costSoFar.set(startStr, 0)

while (frontier.length > 0) {
  const [currR, currC, currDir] = frontier.pop()!
  const currentStr = `${currR},${currC}`

  for (const [nextR, nextC, nextDir, turnCost] of getNeighbors([currR, currC], currDir)) {
    const nextStr = `${nextR},${nextC}`
    let newCost = costSoFar.get(currentStr)! + 1 + turnCost

    if (!costSoFar.has(nextStr) || newCost < costSoFar.get(nextStr)!) {
      frontier.push([nextR, nextC, nextDir])
      costSoFar.set(nextStr, newCost)
      cameFrom.set(nextStr, currentStr)
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

matrix.forEach((row, r) => {
  row.forEach((cell, c) => {
    if (['E', 'S'].includes(matrix[r][c])) return
    // if (path.includes(`${r},${c}`)) matrix[r][c] = ','
    if (![',', 'E', 'S'].includes(matrix[r][c]) && costSoFar.has(`${r},${c}`))
      matrix[r][c] = costSoFar.get(`${r},${c}`)!.toString()
  })
})

printMatrix(matrix)

console.log('cost so far:')
console.log(costSoFar.get(endStr), '===', 7036, ' pt1 ex1 ok:', costSoFar.get(endStr) === 7036)
console.log(costSoFar.get(endStr), '===', 11048, ' pt1 ex2 ok:', costSoFar.get(endStr) === 11048)
