import { textInput } from '../../shared.ts'

const [wiresStr, gatesStr] = textInput.split('\n\n')

const wires = Object.fromEntries(
  wiresStr.split('\n').map((wire) => {
    const [name, value] = wire.split(': ')
    return [name, Number(value)]
  }),
)

const gatesQueue: (number | string)[][] = gatesStr.split('\n').map((gate) => {
  const [a, op, b, _, out] = gate.split(' ')
  return [a, op, b, out]
})

const gate: { [op: string]: (a: number, b: number) => number } = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  XOR: (a, b) => a ^ b,
}

while (gatesQueue.length) {
  const [a, op, b, out] = gatesQueue.shift()!

  const newA = a in wires ? wires[a] : a
  const newB = b in wires ? wires[b] : b

  if (typeof newA === 'number' && typeof newB === 'number') {
    wires[out] = gate[op](newA, newB)
    continue
  }

  gatesQueue.push([newA, op, newB, out])
}

console.log({ wires })

const zWires = Object.entries(wires)
  .filter(([name]) => name.startsWith('z'))
  .sort()
  .reverse()
  .map(([, value]) => value)
  .join('')

console.log({ zWires })

console.log(parseInt(zWires, 2))
