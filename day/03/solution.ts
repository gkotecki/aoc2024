let input = Deno.readTextFileSync('day/03/input.txt').trim()
console.log({ input })

// function findMatches(input: string) {
//   const matches = input.match(/mul\((\d+),(\d+)\)/g)
//   if (!matches) return []
//   return matches
//     .map((match) => {
//       return match.slice(4, -1).split(',').map(Number)
//     })
//     .map(([a, b]) => a * b)
// }
// console.log(findMatches(input).reduce((a, b) => a + b, 0))

//////////////////////////////////////////////
///////////////// part 2 /////////////////////
//////////////////////////////////////////////

function findMatches(input: string) {
  const matches = input.match(/mul\((\d+),(\d+)\)/g)
  if (!matches) return []
  return matches.map((match) => {
    const [a, b] = match.slice(4, -1).split(',').map(Number)
    return a * b
  })
}

while (input.includes(`don't()`)) {
  const start = input.indexOf(`don't()`)
  const end = input.indexOf(`do()`, start)
  const before = input.slice(0, start)
  const after = input.slice(end === -1 ? end : end + 4)
  input = before + after
}

const multiSum = findMatches(input).reduce((a, b) => a + b, 0)
console.log({ multiSum })
