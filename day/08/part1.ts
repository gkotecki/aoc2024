import { textInput } from '../../shared.ts'

const matrix = textInput.split('\n').map((line) => line.split(''))

const nodes = new Map<string, string[]>()
const antiNodes = new Set<string>()

for (let l = 0; l < matrix.length; l++) {
  for (let c = 0; c < matrix[l].length; c++) {
    const char = matrix[l][c]
    if (char === '.') continue
    nodes.set(char, [...(nodes.get(char) || []), `${l},${c}`])
  }
}

for (const [key, coords] of nodes) {
  for (let i = 0; i < coords.length; i++) {
    for (let ii = i + 1; ii < coords.length; ii++) {
      const a = coords[i].split(',').map(Number)
      const b = coords[ii].split(',').map(Number)
      console.log(a, b)
      const lDiff = Math.abs(a[0] - b[0])
      const cDiff = Math.abs(a[1] - b[1])

      const antis = [
        [0, 0],
        [0, 0],
      ]

      if (a[0] > b[0]) {
        antis[0][0] = a[0] + lDiff
        antis[1][0] = b[0] - lDiff
      } else {
        antis[0][0] = a[0] - lDiff
        antis[1][0] = b[0] + lDiff
      }

      if (a[1] > b[1]) {
        antis[0][1] = a[1] + cDiff
        antis[1][1] = b[1] - cDiff
      } else {
        antis[0][1] = a[1] - cDiff
        antis[1][1] = b[1] + cDiff
      }

      antis.forEach(([l, c]) => {
        if (l < 0 || c < 0 || l >= matrix.length || c >= matrix[l].length) return
        antiNodes.add(`${l},${c}`)
      })
    }
  }
}

console.log({ nodes, antiNodes, result: antiNodes.size })
