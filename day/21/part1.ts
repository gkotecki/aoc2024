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
    'v': 'v<A',
    '>': 'vA',
  },
  '^': {
    'A': '>A',
    '^': 'A',
    '<': 'v<A',
    'v': 'vA',
    '>': '>vA',
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
    '^': '^<A',
    '<': '<<A',
    'v': '<A',
    '>': 'A',
  },
}

let totalComplexity = 0

for (const input of inputs) {
  console.log({ input })

  let aggA = ''
  let aggB = ''
  let aggC = ''

  let currentA = 'A'
  for (const charA of input) {
    const dirsA = keypadMap[currentA][charA]
    aggA += dirsA
    currentA = charA

    let currentB = 'A'
    for (const charB of dirsA) {
      const dirsB = dirMap[currentB][charB]
      aggB += dirsB
      currentB = charB

      let currentC = 'A'
      for (const charC of dirsB) {
        const dirsC = dirMap[currentC][charC]
        aggC += dirsC
        currentC = charC
        // aggC += ' '
      }
      // aggB += ' '
    }
    // aggA += ' '
  }

  console.log(aggA, aggA.length)
  // console.log('<A^A>^^AvvvA')
  console.log(aggB, aggB.length)
  // console.log('v<<A>>^A<A>AvA<^AA>A<vAAA>^A')
  console.log(aggC, aggC.length)
  // console.log('<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A')

  const complexity = aggC.length * +input.slice(0, 3)
  console.log(aggC.length, '*', +input.slice(0, 3), '=', complexity, '\n')
  totalComplexity += complexity
}

console.log({ totalComplexity })
/**
 * part 1 tries:
 *
 * real input tries:
 * 163246 too high
 * 161886 too high
 * 159558 too high
 * 157230 ok!
 *
 * example 2 tries:
 * 454856 too high, pass ex1, pass some other stuff, real input too high
 * 452528 too high, pass ex1, pass some other stuff, real input too high
 * 446624 prolly too high, fails some outside examples
 */