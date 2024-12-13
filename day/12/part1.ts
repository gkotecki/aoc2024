import { textInput } from '../../shared.ts'

const matrix = textInput.split('\n').map((row) => row.split(''))
const uniqueChars = new Set<string>(matrix.flat())

///////////////////// visualization block /////////////////////
const colorMap = new Map<string, string>(
  Array.from(uniqueChars).map((char, index) => [char, `\x1b[48;5;${index + 0}m`]),
)
matrix.forEach((row) => {
  const paintedRow = row.map((cell) => `${colorMap.get(cell)} ${cell} `).join('')
  console.log(paintedRow)
})
console.log('\x1b[0m') // reset
///////////////////// visualization block /////////////////////

const rows = matrix.length
const cols = matrix[0].length

function countNeighbors(r: number, c: number, char: string): number {
  let count = 0
  if (r > 0 && matrix[r - 1][c] == char) count++ // up
  if (c > 0 && matrix[r][c - 1] == char) count++ // left
  if (r < rows - 1 && matrix[r + 1][c] == char) count++ // down
  if (c < cols - 1 && matrix[r][c + 1] == char) count++ // right
  return count
}

function dfs(r: number, c: number, char: string, visited: Set<string>): number {
  const outOfBounds = r < 0 || r >= rows || c < 0 || c >= cols
  if (outOfBounds || visited.has(`${r},${c}`) || matrix[r][c] !== char) {
    return 0
  }
  visited.add(`${r},${c}`)
  return (
    1 + // current cell
    dfs(r - 1, c, char, visited) + // up
    dfs(r + 1, c, char, visited) + // down
    dfs(r, c - 1, char, visited) + // left
    dfs(r, c + 1, char, visited) // right
  )
}

const globalVisits = new Set<string>()
const nodeMap: { key: string; perimeter: number; area: number }[] = []

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const char = matrix[r][c]
    if (globalVisits.has(`${r},${c}`)) continue

    const localVisits = new Set<string>()
    const localArea = dfs(r, c, char, localVisits)
    let localPerimeter = 0
    for (const node of localVisits) {
      globalVisits.add(node)
      const [nr, nc] = node.split(',').map(Number)
      localPerimeter += 4 - countNeighbors(nr, nc, char)
    }

    nodeMap.push({ key: char, perimeter: localPerimeter, area: localArea })
  }
}

console.log(nodeMap)

let total = 0
for (const {key, perimeter, area} of nodeMap) {
  total += area * perimeter
}

console.log(total, 'should be', 1930, '>>', total == 1930) // 1930
