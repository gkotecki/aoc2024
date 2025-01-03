import { textInput } from '../../shared.ts'

const connections = textInput.split('\n')
const pairs = connections.map((line) => line.split('-'))
const sortedPairs = pairs.map((pair) => pair.sort()).sort()
const sortedKeyPairs = sortedPairs.map((pair) => pair.join('-'))
const computers = [...new Set(sortedPairs.flat())].sort()

console.log({
  sortedPairs,
  sortedKeyPairs,
  computers,
})

const connectionMap = new Map<string, Set<string>>()
for (const computer of computers) {
  const set = new Set<string>()
  for (const [a, b] of sortedPairs) {
    if (a === computer) set.add(b)
    if (b === computer) set.add(a)
  }
  connectionMap.set(computer, set)
}
console.log('connectionMap', connectionMap)

const trios = new Set<string>()
for (const [computer, connectionSet] of connectionMap) {
  const cons = [...connectionSet]
  for (let i = 0; i < cons.length; i++) {
    for (let j = i + 1; j < cons.length; j++) {
      const key = [cons[i], cons[j]].sort().join('-')
      if (sortedKeyPairs.includes(key)) {
        trios.add([computer, cons[i], cons[j]].sort().join(','))
      }
    }
  }
}
console.log(trios)

const filtered = [...trios].filter((pcs) => !!pcs.split(',').find((pc) => pc.startsWith('t')))
console.log(filtered, filtered.length)
