import { textInput } from '../../shared.ts'

const inputs = textInput.split('\n\n').map((k) => k.split('\n'))

const parsePinHeights = (input: string[]) => {
  const heights: number[] = new Array(5).fill(-1)
  for (const line of input) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] == '#') {
        heights[i]++
      }
    }
  }
  return heights
}

const locks = inputs.filter((item) => item[0] == '#####').map(parsePinHeights)
const keys = inputs.filter((item) => item[0] == '.....').map(parsePinHeights)

console.log({ locks, keys })

let fitCount = 0
for (const lock of locks) {
  for (const key of keys) {
    let fits = true
    for (let i = 0; i < 5; i++) {
      if (lock[i] + key[i] > 5) {
        fits = false
        break
      }
    }
    if (fits) fitCount++
  }
}

console.log({ fitCount })
