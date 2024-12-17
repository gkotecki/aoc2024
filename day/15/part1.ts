import { printMatrix, textInput } from '../../shared.ts'

const [mapStr, directionsStr] = textInput.split('\n\n')
const map = mapStr.split('\n').map((line) => line.split(''))
const directions = directionsStr.split('\n').flatMap((line) => line.split(''))

const initialPosition = map
  .flatMap((row, r) => row.map((cell, c) => ({ cell, r, c })))
  .find(({ cell }) => cell === '@')!

console.log({ directions, initialPosition })

const dirMap = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] }

type Directions = 'up' | 'down' | 'left' | 'right'

function move(
  [l, c]: [number, number],
  dir: Directions,
): { wallAhead: boolean; newPos: [number, number] } {
  const [nextL, nextC] = [l + dirMap[dir][0], c + dirMap[dir][1]]
  const currentCell = map[l][c]
  const nextCell = map[nextL][nextC]

  if (nextCell === '#') {
    return { wallAhead: true, newPos: [l, c] }
  }

  if (nextCell === '.') {
    map[nextL][nextC] = currentCell
    map[l][c] = '.'
    return { wallAhead: false, newPos: [nextL, nextC] }
  }

  const { wallAhead } = move([nextL, nextC], dir)
  if (wallAhead) {
    return { wallAhead: true, newPos: [l, c] }
  }

  map[nextL][nextC] = currentCell
  map[l][c] = '.'
  return { wallAhead: false, newPos: [nextL, nextC] }
}

// type ArrowKey = 'up' | 'down' | 'right' | 'left'
// async function readArrowKey(): Promise<ArrowKey | null> {
//   Deno.stdin.setRaw(true)
//   const buf = new Uint8Array(4)
//   await Deno.stdin.read(buf)
//   if (buf[0] === 0x1b && buf[1] === 0x5b) {
//     switch (buf[2]) {
//       case 0x41:
//         return 'up'
//       case 0x42:
//         return 'down'
//       case 0x43:
//         return 'right'
//       case 0x44:
//         return 'left'
//     }
//   }
//   return null
// }

let pos = [initialPosition.r, initialPosition.c] as [number, number]

// while (true) {
//   const key = await readArrowKey()
//   console.clear()
//   console.log('\n', key)
//   if (key) {
//     pos = move(pos, key).newPos
//   }
//   printMatrix(map)
// }

printMatrix(map)

for (const dir of directions) {
  if (dir === '^') pos = move(pos, 'up').newPos
  if (dir === 'v') pos = move(pos, 'down').newPos
  if (dir === '<') pos = move(pos, 'left').newPos
  if (dir === '>') pos = move(pos, 'right').newPos
}

printMatrix(map)

let sum = 0
for (let l = 0; l < map.length; l++) {
  for (let c = 0; c < map[0].length; c++) {
    if (map[l][c] === 'O') {
      sum += 100 * l + c
    }
  }
}

console.log({ sum })
