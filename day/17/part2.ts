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
const base8Array = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let lastIterator = 0
let bruteForce = false

while (true) {
  lastIterator = bruteForce ? ++lastIterator : parseInt(base8Array.join(''), 8)
  registerA = lastIterator
  registerB = Number(input[1])
  registerC = Number(input[2])

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
  console.log({ lastIterator }, lastIterator.toString(8))
  console.log(outputStr)
  console.log(expectedOutput)

  if (outputStr == expectedOutput) {
    console.log({ lastIterator }, outputStr)
    break
  }

  if (bruteForce) continue

  if (output[15] != program[15]) base8Array[0] += 1
  else if (output[14] != program[14]) base8Array[1] += 1
  else if (output[13] != program[13]) base8Array[2] += 1
  else if (output[12] != program[12]) base8Array[3] += 1
  else if (output[11] != program[11]) base8Array[4] += 1
  else if (output[10] != program[10]) base8Array[5] += 1
  else if (output[9] != program[9]) base8Array[6] += 1
  else if (output[8] != program[8]) base8Array[7] += 1
  else if (output[7] != program[7]) base8Array[8] += 1
  else if (output[6] != program[6]) base8Array[9] += 1
  else if (output[5] != program[5]) base8Array[10] += 1
  else if (output[4] != program[4]) base8Array[11] += 1
  else if (output[3] != program[3]) base8Array[12] += 1
  else bruteForce = true
}
