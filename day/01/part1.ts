import { textInput } from '../../shared.ts'

const input = textInput.split('\n')

let left = [] as number[]
let right = [] as number[]

input.forEach((line, i) => {
  const [a, b] = line.split('   ')
  left.push(Number(a))
  right.push(Number(b))
})

left = left.sort((a, b) => a - b)
right = right.sort((a, b) => a - b)
const diffs = left.map((l, i) => Math.abs(l - right[i]))
const sum = diffs.reduce((acc, curr) => acc + curr, 0)
console.log({ sum })
