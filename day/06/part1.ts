import { textInput } from '../../shared.ts'

const lines = textInput.split('\n')

let position: number[] = []
for (let l = 0; l < lines.length; l++) {
  for (let c = 0; c < lines[0].length; c++) {
    if (lines[l][c] === '^') {
      position = [l, c]
    }
  }
}

const directionHelper = (newPos: number[]) => {
  let glanceValue = ''
  try {
    glanceValue = lines[newPos[0]][newPos[1]] || ''
  } catch (error) {}
  return { glanceValue, newPos }
}

const goUp = (pos: number[]) => directionHelper([pos[0] - 1, pos[1]])
const goRight = (pos: number[]) => directionHelper([pos[0], pos[1] + 1])
const goDown = (pos: number[]) => directionHelper([pos[0] + 1, pos[1]])
const goLeft = (pos: number[]) => directionHelper([pos[0], pos[1] - 1])

const turnMap = {
  up: { newDir: 'right', dirData: goUp },
  right: { newDir: 'down', dirData: goRight },
  down: { newDir: 'left', dirData: goDown },
  left: { newDir: 'up', dirData: goLeft },
}
const visitedPos = new Set()
let lastDir = 'up'

while (true) {
  visitedPos.add(position.toString())
  const { newDir, dirData } = turnMap[lastDir as keyof typeof turnMap]
  const { glanceValue, newPos } = dirData(position)
  if (!glanceValue) break
  if (glanceValue === '.' || glanceValue === '^') position = newPos
  if (glanceValue === '#') lastDir = newDir
}

console.log(visitedPos.size)
