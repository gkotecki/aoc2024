import { textInput } from '../../shared.ts'

const input = textInput.split('\n')

let left = [] as number[]
let right = [] as number[]

input.forEach((line, i) => {
  const [a, b] = line.split('   ')
  left.push(Number(a))
  right.push(Number(b))
})

const instances = left.map((item) => {
  const count = right.filter((i) => i === item).length
  return +item * count
})

const sum = instances.reduce((acc, curr) => acc + curr, 0)

console.log({ sum })
