import { textInput } from '../../shared.ts'

const reports = textInput.split('\n').map((line) => line.split(' ').map(Number))
console.log(reports)

const isSafe = (line: number[]): boolean => {
  console.log(line)
  let firstDiff: number
  while (line.length > 1) {
    const diff = line.shift()! - line.at(0)!
    // console.log(diff)
    firstDiff ??= diff
    if (firstDiff > 0 && diff < 0) return false
    if (firstDiff < 0 && diff > 0) return false
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false
  }
  return true
}

const safeLines = reports.filter(isSafe).length

console.log({ safeLines })
