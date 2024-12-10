import { textInput } from '../../shared.ts'

const input = textInput // 1928

const startingBlock = [] as { id: number | '.'; size: number }[]
let id = 0
for (let i = 0; i < textInput.length; i++) {
  if (i % 2 === 0) {
    startingBlock.push({ id, size: +textInput[i] })
    id++
  } else {
    startingBlock.push({ id: '.', size: +textInput[i] })
  }
}

let blocks = structuredClone(startingBlock)

let start = 0
let end = blocks.length - 1

while (end > 0) {
  if (start > end) {
    start = 0
    end--
    continue
  }

  if (blocks[start].id !== '.') {
    start++
    continue
  }

  while (blocks[end].id === '.') end--

  const emptySize = blocks[start].size
  const valueSize = blocks[end].size
  const id = blocks[end].id

  if (emptySize < valueSize) {
    start++
    continue
  }

  blocks[start] = { id, size: valueSize }
  blocks[end] = { id: '.', size: valueSize }

  if (emptySize === valueSize) {
    start = 0
    continue
  }

  if (emptySize > valueSize) {
    const before = blocks.slice(0, start + 1)
    const after = blocks.slice(start + 1)

    blocks = [...before, { id: '.', size: emptySize - valueSize }, ...after]

    start = 0
    continue
  }
}

const parsedBlock = blocks.flatMap(({ id, size }) => Array(size).fill(id))
const checkSum = parsedBlock.reduce((acc: number, curr, ix) => {
  if (curr === '.') return acc
  return acc + curr * ix
}, 0)

console.log({ input, startingBlock, blocks, parsedBlock: parsedBlock.join(''), checkSum })
