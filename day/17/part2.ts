import { textInput } from '../../shared.ts'

const input = textInput
  .split('\n')
  .filter(Boolean)
  .map((row) => row.split(': ')[1])

let registerA = 0
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
    registerA = Math.trunc(registerA / 2 ** combo(operand))
  },
  1: (operand: number) => {
    registerB = Number(BigInt(registerB) ^ BigInt(operand))
  },
  2: (operand: number) => {
    registerB = combo(operand) & 7
  },
  3: (operand: number) => {
    if (registerA == 0) return
    instructionPointer = operand - 2
  },
  4: (operand: number) => {
    registerB = Number(BigInt(registerB) ^ BigInt(registerC))
  },
  5: (operand: number) => {
    output.push(combo(operand) & 7)
  },
  6: (operand: number) => {
    registerB = Math.trunc(registerA / 2 ** combo(operand))
  },
  7: (operand: number) => {
    registerC = Math.trunc(registerA / 2 ** combo(operand))
  },
}

const expectedOutput = program.join(',')
console.log('program length', program.length)

console.log({ registerA, registerB, registerC, expectedOutput })
let iterator = parseInt('5600532756000000', 8)

while (true) {
  registerA = iterator
  registerB = Number(input[1]) // any integer
  registerC = Number(input[2]) // any integer

  instructionPointer = 0
  output = []

  while (true) {
    if (instructionPointer >= program.length) break
    const opcode = program[instructionPointer]
    const operand = program[instructionPointer + 1]
    instructions[opcode as keyof typeof instructions](operand)
    instructionPointer += 2
  }

  const outputStr = output.join(',')
  console.log({ iterator }, iterator.toString(8))
  console.log(outputStr)
  console.log(expectedOutput)

  if (outputStr == expectedOutput) {
    console.log({ iterator }, outputStr)
    break
  }

  iterator += 1
}

/**
 * my res: 202356708354602
 */
