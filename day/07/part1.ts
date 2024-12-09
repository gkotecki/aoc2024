import { textInput } from '../../shared.ts'

function generatePermutations(list: string[], size: number = list.length): string[][] {
  if (size == 1) return list.map((d) => [d])
  return list.flatMap((d) => generatePermutations(list, size - 1).map((item) => [d, ...item]))
}

const validLines = textInput
  .split('\n')
  .map((line) => {
    const [testStr, numberStr] = line.split(': ')
    return [+testStr, numberStr.split(' ').map(Number)] as [number, number[]]
  })
  .filter(([testValue, numbers]) => {
    console.log('\n>> Testing', testValue, numbers)
    const permutations = generatePermutations(['+', '*'], numbers.length - 1)
    for (const operators of permutations) {
      let value = numbers[0]
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') value += numbers[i + 1]
        else if (operators[i] === '*') value *= numbers[i + 1]
        if (value > testValue) break
      }
      if (value === testValue) return true
    }
    return false
  })

const sum = validLines.reduce((acc, [value]) => acc + value, 0)

console.log({ validLines, sum })
