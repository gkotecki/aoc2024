import { printMatrix, textInput } from '../../shared.ts'

const gridSize = 71
const coords = textInput.split('\n').map((row) => row.split(',').map(Number))
const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill('.'))

for (let byte = 0; byte < 1024; byte++) {
  const [c, r] = coords[byte]
  grid[r][c] = '#'
}

console.log({ coords })

function getNeighbors([r, c]: [number, number]) {
  const neighbors: [number, number][] = []
  if (r - 1 >= 0 && grid[r - 1][c] !== '#') neighbors.push([r - 1, c]) // up
  if (r + 1 < gridSize && grid[r + 1][c] !== '#') neighbors.push([r + 1, c]) // down
  if (c - 1 >= 0 && grid[r][c - 1] !== '#') neighbors.push([r, c - 1]) // left
  if (c + 1 < gridSize && grid[r][c + 1] !== '#') neighbors.push([r, c + 1]) // right
  return neighbors
}

const frontier: [number, number][] = []
frontier.push([0, 0])

const cameFrom = new Map<string, string | undefined>()
cameFrom.set('0,0', undefined)

const costSoFar = new Map<string, number>()
costSoFar.set('0,0', 0)

while (frontier.length > 0) {
  const [currR, currC] = frontier.pop()!
  const currentStr = `${currR},${currC}`

  // if (currentStr === `${gridSize - 1},${gridSize - 1}`) break

  for (const [nextR, nextC] of getNeighbors([currR, currC])) {
    const nextStr = `${nextR},${nextC}`
    let newCost = costSoFar.get(currentStr)! + 1

    if (!costSoFar.has(nextStr) || newCost < costSoFar.get(nextStr)!) {
      frontier.push([nextR, nextC])
      costSoFar.set(nextStr, newCost)
      cameFrom.set(nextStr, currentStr)
    }
  }
}

const path: string[] = []
let current = `${gridSize - 1},${gridSize - 1}`
while (true) {
  path.push(current)
  current = cameFrom.get(current)!
  if (current === '0,0') {
    break
  }
}

console.log(path.length)

grid.forEach((row, r) => {
  row.forEach((cell, c) => {
    if (path.includes(`${r},${c}`)) grid[r][c] = ','
  })
})

printMatrix(grid)
