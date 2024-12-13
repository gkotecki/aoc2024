import { textInput } from '../../shared.ts'

const aaa = `
AAAAA
AABAA
AAAAA`

const bbb = `
BAB
ABA
BAB`

const ccc = `
AAABBB
BBBBCC`

const ddd = `
RRRRII
RRRRII
VVRRRC
VVRCCC`

const eee = `
AAAAA
AABAA
ABBBA
AABAA
AAAAA`


const matrix = textInput
  .trim()
  .split('\n')
  .map((row) => row.split(''))
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

function countVertex(r: number, c: number, char: string): number {
  const up = r > 0 && matrix[r - 1][c] == char
  const left = c > 0 && matrix[r][c - 1] == char
  const down = r < rows - 1 && matrix[r + 1][c] == char
  const right = c < cols - 1 && matrix[r][c + 1] == char

  let count = 0

  if (!up && !left) count++
  if (up && left && matrix[r - 1][c - 1] != char) count++

  if (!up && !right) count++
  if (up && right && matrix[r - 1][c + 1] != char) count++

  if (!down && !right) count++
  if (down && right && matrix[r + 1][c + 1] != char) count++

  if (!down && !left) count++
  if (down && left && matrix[r + 1][c - 1] != char) count++

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
const nodeMap: { key: string; vertex: number; area: number }[] = []

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const char = matrix[r][c]
    if (globalVisits.has(`${r},${c}`)) continue

    const localVisits = new Set<string>()
    const localArea = dfs(r, c, char, localVisits)
    let localVertex = 0
    for (const node of localVisits) {
      globalVisits.add(node)
      const [nr, nc] = node.split(',').map(Number)
      localVertex += countVertex(nr, nc, char)
    }

    nodeMap.push({ key: char, vertex: localVertex, area: localArea })
  }
}

console.log(nodeMap)

let total = 0
for (const { key, vertex, area } of nodeMap) {
  total += area * vertex
}

console.log(total, 'should be', 1206, '>>', total == 1206) // 1206
