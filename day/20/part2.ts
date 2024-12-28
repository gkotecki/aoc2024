import { printMatrix, textInput } from '../../shared.ts'

const grid = textInput.split('\n').map((row) => row.split(''))

printMatrix(grid)

type Point = {
  x: number
  y: number
}

class Node {
  position: Point
  g: number // Cost from start to current node
  h: number // Heuristic cost to end
  f: number // Total cost (g + h)
  parent: Node | null

  constructor(pos: Point, g: number, h: number, parent: Node | null = null) {
    this.position = pos
    this.g = g
    this.h = h
    this.f = g + h
    this.parent = parent
  }
}

function manhattanDistance(p1: Point, p2: Point): number {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

function getNeighbors(point: Point, grid: string[][]): Point[] {
  const directions = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ]
  return directions
    .map((dir) => ({ x: point.x + dir.x, y: point.y + dir.y }))
    .filter(
      (p) =>
        p.x >= 0 && p.x < grid[0].length && p.y >= 0 && p.y < grid.length && grid[p.y][p.x] !== '#',
    )
}

function findPath(grid: string[][]): Point[] {
  let start: Point = { x: 0, y: 0 }
  let end: Point = { x: 0, y: 0 }

  // Find start and end positions
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'S') start = { x, y }
      if (grid[y][x] === 'E') end = { x, y }
    }
  }

  const openSet: Node[] = []
  const closedSet: Set<string> = new Set()
  const startNode = new Node(start, 0, manhattanDistance(start, end))
  openSet.push(startNode)

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f)
    const current = openSet.shift()!

    if (current.position.x === end.x && current.position.y === end.y) {
      // Reconstruct path
      const path: Point[] = []
      let currentNode: Node | null = current
      while (currentNode !== null) {
        path.unshift(currentNode.position)
        currentNode = currentNode.parent
      }
      return path
    }

    closedSet.add(`${current.position.x},${current.position.y}`)

    for (const neighbor of getNeighbors(current.position, grid)) {
      if (closedSet.has(`${neighbor.x},${neighbor.y}`)) continue

      const g = current.g + 1
      const h = manhattanDistance(neighbor, end)
      const neighborNode = new Node(neighbor, g, h, current)

      if (
        !openSet.some(
          (node) =>
            node.position.x === neighbor.x &&
            node.position.y === neighbor.y &&
            node.f < neighborNode.f,
        )
      ) {
        openSet.push(neighborNode)
      }
    }
  }

  return [] // No path found
}

const shortestTime = findPath(grid)
console.log('Shortest initial time:', shortestTime)
