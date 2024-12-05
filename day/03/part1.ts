import { textInput } from '../../shared.ts'

let input = textInput
console.log({ input })

function findMatches(input: string) {
  const matches = input.match(/mul\((\d+),(\d+)\)/g)
  if (!matches) return []
  return matches
    .map((match) => {
      return match.slice(4, -1).split(',').map(Number)
    })
    .map(([a, b]) => a * b)
}
console.log(findMatches(input).reduce((a, b) => a + b, 0))
