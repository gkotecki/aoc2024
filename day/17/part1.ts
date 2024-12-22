import { textInput } from '../../shared.ts'

const input = textInput
  .split('\n')
  .filter(Boolean)
  .map((row) => row.split(': ')[1])

let registerA = Number(input[0]) // any integer
let registerB = Number(input[1]) // any integer
let registerC = Number(input[2]) // any integer
const program = input[3].split(',').map(Number) // 3-bit list (0-7)

let instructionPointer = 0
let output: number[] = []

const combo = (operand: number) => {
  if (operand == 0) return 0
  if (operand == 1) return 1
  if (operand == 2) return 2
  if (operand == 3) return 3
  if (operand == 4) return registerA
  if (operand == 5) return registerB
  if (operand == 6) return registerC
  return 7
}

const instructions = {
  0: (operand: number) => {
    registerA = (registerA / 2 ** combo(operand)) | 0
  },
  1: (operand: number) => {
    registerB = registerB ^ operand
  },
  2: (operand: number) => {
    registerB = combo(operand) % 8
  },
  3: (operand: number) => {
    if (registerA == 0) return
    instructionPointer = operand - 2
  },
  4: (operand: number) => {
    registerB = registerB ^ registerC
  },
  5: (operand: number) => {
    output.push(combo(operand) % 8)
  },
  6: (operand: number) => {
    registerB = (registerA / 2 ** combo(operand)) | 0
  },
  7: (operand: number) => {
    registerC = (registerA / 2 ** combo(operand)) | 0
  },
}

console.log({ registerA, registerB, registerC, program })

while (true) {
  if (instructionPointer >= program.length) break

  const opcode = program[instructionPointer]
  const operand = program[instructionPointer + 1]

  console.log('\ncurrent state')
  console.log({ registerA, registerB, registerC, instructionPointer, opcode, operand, output })

  instructions[opcode as keyof typeof instructions](operand)
  instructionPointer += 2

  // alert('continue')
}

console.log({ registerA, registerB, registerC, output })
console.log(output.join(','))
