import { printMatrix, textInput } from '../../shared.ts'

const matrix = textInput.split('\n').map((line) => line.split(''))

const start = matrix
  .flatMap((row, r) => row.map((cell, c) => ({ cell, r, c })))
  .find(({ cell }) => cell === 'S')!

const end = matrix
  .flatMap((row, r) => row.map((cell, c) => ({ cell, r, c })))
  .find(({ cell }) => cell === 'E')!

class Node {
  constructor(
    public row: number,
    public col: number,
    public dirR: number,
    public dirC: number,
    public previous: Node | null,
  ) {}
  get key() {
    return `${this.row},${this.col},${this.dirR},${this.dirC}`
  }
  get coords() {
    return [this.row, this.col, this.dirR, this.dirC]
  }
  get pathCoords(): string[] {
    const [r, c] = this.coords
    const coordKey = `${r},${c}`
    if (!this.previous) return [coordKey]
    return [...this.previous.pathCoords, coordKey]
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

const startNode = new Node(start.r, start.c, 0, 1, null)
const endNode = new Node(end.r, end.c, 0, 0, null)

const frontier = new PriorityQueue()
frontier.add(startNode, 0)

const seen = new Set<string>()

const foundCosts: number[] = []
const finalNodes = new Set<string>()

let step = 0
while (frontier.size > 0) {
  step++
  if (step % 1000 == 0) {
    await new Promise((res) => setTimeout(res, 5))
    console.clear()
    printMatrix(matrix)
    console.log('foundCosts', foundCosts)
  }

  const [current, cost] = frontier.grab()!
  seen.add(current.key)

  const [r, c, dr, dc] = current.coords

  if (matrix[r][c] === '.') {
    matrix[r][c] = ','
  }

  if (cost > foundCosts[0]) {
    continue
  }

  if (matrix[r][c] === 'E') {
    foundCosts.push(cost)
    foundCosts.sort()
    current.pathCoords.forEach((coord) => finalNodes.add(coord))
    continue
  }

  for (const [newR, newC, newDirR, newDirC, newCost] of [
    [r + dr, c + dc, dr, dc, cost + 1],
    [r + dc, c - dr, dc, -dr, cost + 1001],
    [r - dc, c + dr, -dc, dr, cost + 1001],
  ]) {
    const next = new Node(newR, newC, newDirR, newDirC, current)
    if (matrix[next.row][next.col] === '#') continue
    if (seen.has(next.key)) continue
    frontier.add(next, newCost)
  }
}

for (const key of finalNodes) {
  const [r, c] = key.split(',').map(Number)
  if (matrix[r][c] == ',') matrix[r][c] = 'X'
}
printMatrix(matrix)

console.log({ foundCosts })
console.log({ finalNodes: finalNodes.size })
