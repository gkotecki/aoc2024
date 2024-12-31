import { textInput } from '../../shared.ts'

const inputs = textInput.split('\n')

const keypadMap: Record<string, Record<string, string>> = {
  A: {
    A: 'A',
    0: '<A',
    1: '^<<A',
    2: '<^A',
    3: '^A',
    4: '^^<<A',
    5: '<^^A',
    6: '^^A',
    7: '^^^<<A',
    8: '<^^^A',
    9: '^^^A',
  },
  0: {
    A: '>A',
    0: 'A',
    1: '^<A',
    2: '^A',
    3: '^>A',
    4: '^^<A',
    5: '^^A',
    6: '^^>A',
    7: '^^^<A',
    8: '^^^A',
    9: '^^^>A',
  },
  1: {
    A: '>>vA',
    0: '>vA',
    1: 'A',
    2: '>A',
    3: '>>A',
    4: '^A',
    5: '^>A',
    6: '^>>a',
    7: '^^A',
    8: '^^>A',
    9: '^^>>A',
  },
  2: {
    A: 'v>A',
    0: 'vA',
    1: '<A',
    2: 'A',
    3: '>A',
    4: '^<A',
    5: '^A',
    6: '^>A',
    7: '^^<A',
    8: '^^A',
    9: '^^>A',
  },
  3: {
    A: 'vA',
    0: 'v<A',
    1: '<<A',
    2: '<A',
    3: 'A',
    4: '<<^A',
    5: '^<A',
    6: '^A',
    7: '<<^^A',
    8: '^^<A',
    9: '^^A',
  },
  4: {
    A: '>>vvA',
    0: '>vvA',
    1: 'vA',
    2: 'v>A',
    3: 'v>>A',
    4: 'A',
    5: '>A',
    6: '>>A',
    7: '^A',
    8: '^>A',
    9: '^>>A',
  },
  5: {
    A: 'vv>A',
    0: 'vvA',
    1: 'v<A',
    2: 'vA',
    3: 'v>A',
    4: '<A',
    5: 'A',
    6: '>A',
    7: '^<A',
    8: '^A',
    9: '^>A',
  },
  6: {
    A: 'vvA',
    0: 'vv<A',
    1: '<<vA',
    2: 'v<A',
    3: 'vA',
    4: '<<A',
    5: '<A',
    6: 'A',
    7: '<<^A',
    8: '^<A',
    9: '^A',
  },
  7: {
    A: '>>vvvA',
    0: '>vvvA',
    1: 'vvA',
    2: 'vv>A',
    3: 'vv>>A',
    4: 'vA',
    5: 'v>A',
    6: 'v>>A',
    7: 'A',
    8: '>A',
    9: '>>A',
  },
  8: {
    A: 'vvv>A',
    0: 'vvvA',
    1: 'vv<A',
    2: 'vvA',
    3: 'vv>A',
    4: 'v<A',
    5: 'vA',
    6: 'v>A',
    7: '<A',
    8: 'A',
    9: '>A',
  },
  9: {
    A: 'vvvA',
    0: 'vvv<A',
    1: '<<vvA',
    2: 'vv<A',
    3: 'vvA',
    4: '<<vA',
    5: 'v<A',
    6: 'vA',
    7: '<<A',
    8: '<A',
    9: 'A',
  },
}

const dirMap: Record<string, Record<string, string>> = {
  'A': {
    'A': 'A',
    '^': '<A',
    '<': 'v<<A',
    'v': '<vA',
    '>': 'vA',
  },
  '^': {
    'A': '>A',
    '^': 'A',
    '<': 'v<A',
    'v': 'vA',
    '>': 'v>A',
  },
  '<': {
    'A': '>>^A',
    '^': '>^A',
    '<': 'A',
    'v': '>A',
    '>': '>>A',
  },
  'v': {
    'A': '^>A',
    '^': '^A',
    '<': '<A',
    'v': 'A',
    '>': '>A',
  },
  '>': {
    'A': '^A',
    '^': '<^A',
    '<': '<<A',
    'v': '<A',
    '>': 'A',
  },
}

const memo = new Map<string, number>()

function getComplexity(input: string, depth: number, currentChar = 'A'): number {
  const key = `${input}-${depth}-${currentChar}`
  if (memo.has(key)) return memo.get(key)!

  if (depth === 0) return input.length

  let total = 0
  for (const char of input) {
    const dirs = dirMap[currentChar][char]
    currentChar = char
    total += getComplexity(dirs, depth - 1)
  }

  memo.set(key, total)
  return total
}

let totalComplexity = 0

for (const input of inputs) {
  console.log({ input })

  let currentKey = 'A'
  let complexity = 0

  for (const char of input) {
    const keyPresses = keypadMap[currentKey][char]
    currentKey = char
    complexity += getComplexity(keyPresses, 25)
  }

  const total = complexity * +input.slice(0, 3)
  console.log(complexity, '*', +input.slice(0, 3), '=', total, '\n')
  totalComplexity += total
}

console.log({ totalComplexity })
/**
 * part 1 tries:
 * 157230 ok!
 *
 * part 2 tries:
 * example input response: 154115708116294
 * 24 loops: 117970480082524
 * 25 loops: 302092607047068
 *
 * 24 loops:
 *  150409815895912 too low
 *
 * 25 loops:
 *  385161552449584 too high
 *  195969155897936 ok !!!!!!!!!!!!!!!!
 */

// 82050061710,  72242026390,  81251039228,  80786362258,  77985628636
// 162694909118, 141722550692, 158790233128, 158499927834, 152472127130