import { textInput } from '../../shared.ts'

const input = textInput // 1928

const startingBlock = [] as (number | '.')[]
let id = 0
for (let i = 0; i < textInput.length; i++) {
  if (i % 2 === 0) {
    for (let repeat = 0; repeat < +textInput[i]; repeat++) {
      startingBlock.push(id)
    }
    id++
  } else {
    for (let repeat = 0; repeat < +textInput[i]; repeat++) {
      startingBlock.push('.')
    }
  }
}

const blocks = structuredClone(startingBlock)
let endPointer = blocks.length - 1
for (let index = 0; index < blocks.length; index++) {
  if (blocks[index] !== '.') continue
  if (index >= endPointer) break
  while (blocks[endPointer] === '.') endPointer--
  const temp = blocks[index]
  blocks[index] = blocks[endPointer]
  blocks[endPointer] = temp
}

const checkSum = blocks.reduce((acc: number, curr, ix) => {
  if (curr === '.') return acc
  return acc + curr * ix
}, 0)

console.log({ input, startingBlock: startingBlock.join(''), blocks: blocks.join(''), checkSum })

// 91_088_873_481 is too low
// 6_386_640_365_805