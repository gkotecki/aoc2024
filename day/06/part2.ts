import { textInput } from '../../shared.ts'

const lines = textInput.split('\n').map((line) => line.split(''))
console.log('dims', [lines.length, lines[0].length])

let startingPosition: number[] = []
for (let l = 0; l < lines.length; l++) {
  for (let c = 0; c < lines[0].length; c++) {
    if (lines[l][c] === '^') {
      startingPosition = [l, c]
    }
  }
}

const directionHelper = (newPos: number[], lines: string[][]) => {
  let glanceValue = ''
  try {
    glanceValue = lines[newPos[0]][newPos[1]] || ''
  } catch (error) {}
  return { glanceValue, newPos }
}

const goUp = (pos: number[], lines: string[][]) => directionHelper([pos[0] - 1, pos[1]], lines)
const goRight = (pos: number[], lines: string[][]) => directionHelper([pos[0], pos[1] + 1], lines)
const goDown = (pos: number[], lines: string[][]) => directionHelper([pos[0] + 1, pos[1]], lines)
const goLeft = (pos: number[], lines: string[][]) => directionHelper([pos[0], pos[1] - 1], lines)

const turnMap = {
  up: { newDir: 'right', dirData: goUp },
  right: { newDir: 'down', dirData: goRight },
  down: { newDir: 'left', dirData: goDown },
  left: { newDir: 'up', dirData: goLeft },
}
let loopBreaks = 0

for (let l = 0; l < lines.length; l++) {
  for (let c = 0; c < lines[0].length; c++) {
    if (lines[l][c] === '#') continue
    // console.log('Trying to block coordinates', [l, c])

    const visitedPos = new Set()
    let pos = startingPosition
    let lastDir = 'up'
    let visitedRepeats = 0

    const newLines = structuredClone(lines)
    newLines[l][c] = '#'

    while (true) {
      if (visitedPos.has(pos.toString())) visitedRepeats += 1
      if (visitedRepeats >= 1_000) {
        loopBreaks += 1
        // console.log('partial loopBreaks:', loopBreaks)
        break
      }

      visitedPos.add(pos.toString())
      const { newDir, dirData } = turnMap[lastDir as keyof typeof turnMap]
      const { glanceValue, newPos } = dirData(pos, newLines)
      if (!glanceValue) break
      if (glanceValue === '.' || glanceValue === '^') pos = newPos
      if (glanceValue === '#') lastDir = newDir
    }
  }
}

console.log('>> loopBreaks:', loopBreaks)
