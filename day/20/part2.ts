import { printMatrix, textInput } from '../../shared.ts'

const matrix = textInput.split('\n').map((line) => line.split(''))

const start = matrix
  .flatMap((row, r) => row.map((cell, c) => ({ cell, r, c })))
  .find(({ cell }) => cell === 'S')!

const end = matrix
  .flatMap((row, r) => row.map((cell, c) => ({ cell, r, c })))
  .find(({ cell }) => cell === 'E')!

class Node {
  constructor(public row: number, public col: number) {}
  get key() {
    return `${this.row},${this.col}`
  }
  get coords() {
    return [this.row, this.col]
  }
}

class PriorityQueue {
  private elements: [Node, number][] = []
  add(node: Node, priority: number) {
    this.elements.push([node, priority])
    this.elements.sort(([, a], [, b]) => a - b)
  }
  grab() {
    return this.elements.shift()
  }
  get size() {
    return this.elements.length
  }
}

printMatrix(matrix)

function manhattanDistance(n1: Node, n2: Node): number {
  return Math.abs(n1.row - n2.row) + Math.abs(n1.col - n2.col)
}

const startNode = new Node(start.r, start.c)
const endNode = new Node(end.r, end.c)

const frontier = new PriorityQueue()
frontier.add(startNode, 0)

const seen = new Set<string>()
const path: Node[] = []
let lowestCost = Infinity

let step = 0
while (frontier.size > 0) {
  step++
  if (step % 100 == 0) {
    await new Promise((res) => setTimeout(res, 10))
    console.clear()
    printMatrix(matrix)
  }

  const [current, cost] = frontier.grab()!
  seen.add(current.key)
  path.push(current)

  const distance = manhattanDistance(current, endNode)

  const [r, c] = current.coords

  if (matrix[r][c] === '.') {
    matrix[r][c] = distance.toString()
  }

  if (matrix[r][c] === 'E') {
    lowestCost = Math.min(lowestCost, cost)
    continue
  }

  for (const [newR, newC] of [
    [r + 1, c],
    [r - 1, c],
    [r, c + 1],
    [r, c - 1],
  ]) {
    const next = new Node(newR, newC)
    if (matrix[next.row][next.col] === '#') continue
    if (seen.has(next.key)) continue
    frontier.add(next, cost + 1)
  }
}

console.clear()
printMatrix(matrix)
console.log({ lowestCost })

let cheats = 0
const threshold = 100

// path is ordered, so indexes == node-sequence == cost
for (let i = 0; i < path.length; i++) {
  for (let j = 0; j < i - threshold; j++) {
    const distance = manhattanDistance(path[j], path[i])
    if (distance <= 20 && i - j - distance >= threshold) {
      cheats += 1
    }
  }
}

console.log({ cheats })
