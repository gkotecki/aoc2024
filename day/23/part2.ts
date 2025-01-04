import { textInput } from '../../shared.ts'

const connections = textInput.split('\n')
const pairs = connections.map((line) => line.split('-'))
const sortedPairs = pairs.map((pair) => pair.sort()).sort()
const sortedKeyPairs = sortedPairs.map((pair) => pair.join(','))
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

function findCliques(graph: Map<string, Set<string>>): Set<string>[] {
  const results: Set<string>[] = []

  function bronKerbosch(potential: Set<string>, excluded: Set<string>, current: Set<string>) {
    if (potential.size === 0 && excluded.size === 0) {
      if (current.size > 0) results.push(new Set(current))
      return
    }

    const pivot = [...potential, ...excluded][0]
    const candidates = new Set([...potential].filter((v) => !graph.get(pivot)?.has(v)))

    for (const vertex of candidates) {
      const neighbors = graph.get(vertex) || new Set()
      bronKerbosch(
        new Set([...potential].filter((v) => neighbors.has(v))),
        new Set([...excluded].filter((v) => neighbors.has(v))),
        new Set([...current, vertex]),
      )
      potential.delete(vertex)
      excluded.add(vertex)
    }
  }

  bronKerbosch(new Set(computers), new Set(), new Set())

  return results
}

const cliques = findCliques(connectionMap)
const longestClique = cliques.sort((a, b) => b.size - a.size)[0]

console.log({ cliques })
console.log({ longestClique }, longestClique.size)
console.log([...longestClique].sort().join(','))
