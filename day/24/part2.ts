import { textInput } from '../../shared.ts'

const [wiresStr, gatesStr] = textInput.split('\n\n')

const wires = Object.fromEntries(
  wiresStr.split('\n').map((wire) => {
    const [name, value] = wire.split(': ')
    return [name, Number(value)]
  }),
)

const gates: (number | string)[][] = gatesStr.split('\n').map((gate) => {
  const [a, op, b, _, out] = gate.split(' ')
  return [a, op, b, out]
})
const gatesQueue = [...gates]

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

const adder = new Array(48).fill(0).map((_, ix) => `${ix}`.padStart(2, '0'))

console.table(
  adder.map((id) => {
    const a = `x${id}`
    const b = `y${id}`
    const out = `z${id}`
    return {
      a,
      'wires[a]': wires[a],
      b,
      'wires[b]': wires[b],
      out,
      'wires[out]': wires[out],
    }
  }),
)

const fetchBinaryFromWires = (prefix: string) =>
  Object.entries(wires)
    .filter(([name]) => name.startsWith(prefix))
    .sort()
    .reverse()
    .map(([, value]) => value)
    .join('')

const inputX = fetchBinaryFromWires('x')
const inputY = fetchBinaryFromWires('y')
const outputZ = fetchBinaryFromWires('z')

console.log()
console.log(inputX, parseInt(inputX, 2))
console.log('+')
console.log(inputY, parseInt(inputY, 2))
console.log('=')
console.log(outputZ, parseInt(outputZ, 2), '(current)')
const expectedSum = parseInt(inputX, 2) + parseInt(inputY, 2)
const expectedSumBinary = expectedSum.toString(2)
console.log(expectedSum.toString(2), expectedSum, '(expected)')
console.log('_....4...._....3...._....2...._....1...._....0')

const unmatchedZIndexes = [] as number[]
for (let ix = outputZ.length - 1; ix >= 0; ix--) {
  // console.log(ix, outputZ[ix])
  if (outputZ[ix] !== expectedSumBinary[ix]) {
    unmatchedZIndexes.push(outputZ.length - ix - 1)
  }
}

console.log({ unmatchedZIndexes })

//////////// graph time ////////////// (no bueno lol)

const graph = new Map<string, Set<string>>()

const appendToGraph = (key: string, values: string[]) => {
  const set = graph.get(key) ?? new Set()
  values.forEach((value) => set.add(value))
  graph.set(key, set)
}

for (const [a, _, b, out] of gates) {
  appendToGraph(out, [a, b])
  appendToGraph(a, [b, out])
  appendToGraph(b, [a, out])
}

graph.forEach((values, key) => {
  if (key.startsWith('z') || values.values().some((value) => value.startsWith('z'))) {
    if (values.size !== 2 && values.size !== 5) {
      console.log(key, [...values].sort())
    }
  }
})

// cvh,dbb,hbk,kvn,tfn,z14,z18,z23
const manualCheck = ['tfn', 'z14', 'z18', 'z23', 'cvh', 'dbb', 'hbk', 'kvn'].sort().join(',')
console.log({ manualCheck })

// drc [ "cjf", "qqt", "x44", "y44", "z44" ]
// hjs [ "frm", "hgd", "phq", "phr", "z28" ]
// vdh [ "gqd", "kkg", "nwn", "qvs", "z20" ]
// nwn [ "gqd", "vdh", "x20", "y20", "z20" ]
// vkn [ "vkf", "vkg", "x40", "y40", "z40" ]
// cnb [ "vvk", "wmb", "x21", "y21", "z21" ]
// wmb [ "cnb", "ffr", "gqd", "vvk", "z21" ]
// hbk [ "bfn", "bkb", "dfb", "qtw", "z15" ]
// z06 [ "bhd", "mmh" ]
// bhd [ "fnk", "mmh", "rvd", "wkv", "z06" ]
// mmh [ "bhd", "rvd", "x06", "y06", "z06" ]
// z22 [ "bwj", "fkc" ]
// fkc [ "bkv", "bwj", "jbb", "vvk", "z22" ]
// bwj [ "fkc", "jbb", "x22", "y22", "z22" ]
// gnj [ "jfw", "spq", "x01", "y01", "z01" ]
// jfw [ "gnj", "spq", "x00", "y00", "z01" ]
// dwh [ "fhp", "kqn", "x41", "y41", "z41" ]
// kqn [ "dwh", "fhp", "hdm", "vkf", "z41" ]
// z44 [ "drc", "qqt" ]
// qqt [ "bvm", "cjf", "drc", "gsg", "z44" ]
// qwt [ "fdk", "jqm", "x32", "y32", "z32" ]
// dsp [ "bvp", "hff", "x36", "y36", "z36" ]
// bvp [ "bwd", "dsp", "hff", "nvg", "z36" ]
// wmt [ "pkn", "pmv", "tjb", "vkb", "z09" ]
// z45 [ "cjf", "pfk" ]
// cjf [ "drc", "pfk", "qqt", "z45" ]
// pfk [ "cjf", "x44", "y44", "z45" ]
// z27 [ "hgq", "phb" ]
// hgq [ "kth", "phb", "phq", "qcp", "z27" ]
// phb [ "hgq", "phq", "x27", "y27", "z27" ]
// djp [ "dpc", "mft", "qnq", "tvh", "z03" ]
// jqm [ "fdk", "ghr", "qwt", "tpc", "z32" ]
// x18 [ "grp", "y18", "z18" ]
// y18 [ "grp", "x18", "z18" ]
// cqv [ "bwd", "jss", "tfn", "trj", "z35" ]
// jss [ "bwd", "cqv", "x35", "y35", "z35" ]
// x00 [ "jfw", "y00", "z00" ]
// y00 [ "jfw", "x00", "z00" ]
// z19 [ "cjb", "srm" ]
// cjb [ "ffb", "kvn", "qvs", "srm", "z19" ]
// srm [ "cjb", "qvs", "x19", "y19", "z19" ]
// z35 [ "cqv", "jss" ]
// ndd [ "jgw", "ntt", "qnq", "spq", "z02" ]
// z43 [ "cqm", "qqj" ]
// cqm [ "gsg", "qqj", "x43", "y43", "z43" ]
// qqj [ "cqm", "gsg", "kcv", "vvc", "z43" ]
// z05 [ "nbk", "wrk" ]
// nbk [ "fnk", "ptm", "tqb", "wrk", "z05" ]
// wrk [ "fnk", "nbk", "x05", "y05", "z05" ]
// z23 [ "dvw", "rpg" ]
// dvw [ "dbb", "hpj", "jbb", "rpg", "z23" ]
// rpg [ "dbb", "dvw", "x23", "y23", "z23" ]
// z26 [ "bqc", "fwr" ]
// bqc [ "dqt", "fwr", "gqb", "kth", "z26" ]
// fwr [ "bqc", "kth", "x26", "y26", "z26" ]
// z41 [ "dwh", "kqn" ]
// bkb [ "hbk", "qtw", "x15", "y15", "z15" ]
// z24 [ "gjr", "rjm" ]
// rjm [ "dbb", "gcb", "gjr", "swr", "z24" ]
// gjr [ "rjm", "swr", "x24", "y24", "z24" ]
// hnf [ "gqs", "pmv", "x08", "y08", "z08" ]
// fds [ "djd", "dqt", "swr", "wrw", "z25" ]
// gtm [ "mkv", "rmt", "x33", "y33", "z33" ]
// rmt [ "fdk", "gtm", "mkv", "nbb", "z33" ]
// kdh [ "ghr", "qvq", "trg", "vbt", "z31" ]
// qvq [ "ghr", "kdh", "x31", "y31", "z31" ]
// fgv [ "fhp", "kcv", "mfm", "rnc", "z42" ]
// mfm [ "fgv", "kcv", "x42", "y42", "z42" ]
// gqs [ "cpt", "dqn", "hnf", "pmv", "z08" ]
// vkg [ "bts", "hjk", "vkf", "vkn", "z40" ]
// vtk [ "npm", "tqb", "x04", "y04", "z04" ]
// npm [ "sqm", "tqb", "tvh", "vtk", "z04" ]
// mnm [ "hjk", "vhv", "x39", "y39", "z39" ]
// djd [ "dqt", "fds", "x25", "y25", "z25" ]
// z10 [ "cdr", "cmt" ]
// cdr [ "cmt", "krd", "pph", "vkb", "z10" ]
// cmt [ "cdr", "pph", "x10", "y10", "z10" ]
// hgd [ "hjs", "phr", "x28", "y28", "z28" ]
// z39 [ "mnm", "vhv" ]
// vhv [ "hjk", "knq", "mnm", "pdw", "z39" ]
// z38 [ "bwg", "fbv" ]
// fbv [ "bwg", "dvf", "kgg", "pdw", "z38" ]
// bwg [ "fbv", "pdw", "x38", "y38", "z38" ]
// hqs [ "nhr", "vbt", "x30", "y30", "z30" ]
// nhr [ "cwd", "hqs", "pkc", "vbt", "z30" ]
// mqf [ "cht", "cvh", "mkv", "trj", "z34" ]
// cvh [ "mqf", "trj", "x34", "y34", "z34" ]
// z07 [ "ckn", "hqq" ]
// ckn [ "cpt", "dhs", "hqq", "rvd", "z07" ]
// hqq [ "ckn", "cpt", "x07", "y07", "z07" ]
// z18 [ "x18", "y18" ]
// kbh [ "cjv", "jqc", "x17", "y17", "z17" ]
// fvh [ "cqb", "sfk", "x12", "y12", "z12" ]
// bnh [ "dvf", "kss", "x37", "y37", "z37" ]
// z01 [ "gnj", "jfw" ]
// z12 [ "fvh", "sfk" ]
// sfk [ "cqb", "fvh", "rcp", "scv", "z12" ]
// z25 [ "djd", "fds" ]
// z32 [ "jqm", "qwt" ]
// z36 [ "bvp", "dsp" ]
// jdq [ "dkd", "phr", "pkc", "wkc", "z29" ]
// z37 [ "bnh", "kss" ]
// kss [ "bnh", "dvf", "fjf", "hff", "z37" ]
// dkd [ "jdq", "pkc", "x29", "y29", "z29" ]
// z28 [ "hgd", "hjs" ]
// rnt [ "qbs", "rcp", "x11", "y11", "z11" ]
// qbs [ "pph", "rcp", "rnt", "tvr", "z11" ]
// z03 [ "djp", "mft" ]
// mft [ "djp", "tvh", "x03", "y03", "z03" ]
// z15 [ "bkb", "hbk" ]
// z02 [ "jgw", "ndd" ]
// jgw [ "ndd", "qnq", "x02", "y02", "z02" ]
// tjb [ "vkb", "wmt", "x09", "y09", "z09" ]
// z30 [ "hqs", "nhr" ]
// z00 [ "x00", "y00" ]
// kfk [ "chk", "qtw", "sbt", "vgb", "z16" ]
// chk [ "kfk", "vgb", "x16", "y16", "z16" ]
// z42 [ "fgv", "mfm" ]
// mqm [ "cbr", "cqb", "rmg", "scs", "z13" ]
// cbr [ "mqm", "scs", "x13", "y13", "z13" ]
// z11 [ "qbs", "rnt" ]
// z31 [ "kdh", "qvq" ]
// z21 [ "cnb", "wmb" ]
// sjr [ "bfn", "dfb", "tck", "z14" ]
// z04 [ "npm", "vtk" ]
// jqc [ "cjv", "kbh", "prt", "vgb", "z17" ]
// z16 [ "chk", "kfk" ]
// z34 [ "cvh", "mqf" ]
// z29 [ "dkd", "jdq" ]
// z14 [ "sjr", "tck" ]
// tck [ "sjr", "x14", "y14", "z14" ]
// z40 [ "vkg", "vkn" ]
// z17 [ "jqc", "kbh" ]
// z09 [ "tjb", "wmt" ]
// z08 [ "gqs", "hnf" ]
// z20 [ "nwn", "vdh" ]
// z13 [ "cbr", "mqm" ]
// z33 [ "gtm", "rmt" ]

/**
 *
 * Wrong:
 * cjf,pfk,sjr,tck,x00,x18,y00,y18
 *
 * cjf,grp,jfw,sjr,z00,z14,z18,z45
 * cjf,pfk,sjr,tck,z00,z14,z18,z45
 * bfn,dfb,drc,qqt,z00,z14,z18,z45
 *
 * dvw,grp,rpg,sjr,tck,z14,z18,z23
 *
 *
 * Correct:
 * cvh,dbb,hbk,kvn,tfn,z14,z18,z23
 *
 */
