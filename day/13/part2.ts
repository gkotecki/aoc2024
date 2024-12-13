import { textInput } from '../../shared.ts'

const machines = textInput.split('\n\n').map((machine) =>
  machine.split('\n').map((line, ix) => {
    const data = line.split(': ')[1].split(', ')
    // const accr = 0
    const accr = 10000000000000
    if (ix === 0) return [+data[0].slice(2), +data[1].slice(2)]
    else if (ix === 1) return [+data[0].slice(2), +data[1].slice(2)]
    else return [+data[0].slice(2) + accr, +data[1].slice(2) + accr]
  }),
)

console.log({ machines })
// 280
// 0
// 200
// 0
// total 480

// machine 1:
// 94a + 22b = 8400
// 34a + 67b = 5400
// b = (34 * 8400 - 94 * 5400) / (34*22 - 94*67)
// a = (8400 - 22b) / 94

// machine i:
// Xa*a + Xb*b = Px
// Ya*a + Yb*b = Py
// b = (Ya * Px - Xa * Py) / (Ya*Xb - Xa*Yb)
// a = (Px - Xb*b) / Xa

const aCost = 3
const bCost = 1

let totalTokens = 0

// const [[aX, aY], [bX, bY], [pX, pY]] = machines[0]
for (const [[aX, aY], [bX, bY], [pX, pY]] of machines) {
  const bCount = (aY * pX - aX * pY) / (aY * bX - aX * bY)
  const aCount = (pX - bX * bCount) / aX
  console.log('\n>>', { aCount, bCount })

  const roundedA = Math.round(aCount)
  const roundedB = Math.round(bCount)

  if (roundedA !== +aCount.toFixed(6) || roundedB !== +bCount.toFixed(6)) {
    console.log(roundedA, '\t\t', roundedB)
    console.log(+aCount.toFixed(6), '\t', +bCount.toFixed(6))
  } else {
    const cost = aCount * aCost + bCount * bCost
    totalTokens += cost
  }
}

console.log({ totalTokens }, 'should be', 480, { ok: totalTokens == 480 })
