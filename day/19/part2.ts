import { textInput } from '../../shared.ts'

const [patternsStr, designsStr] = textInput.split('\n\n')
const patterns = patternsStr.split(', ')
const designs = designsStr.split('\n')

console.log({ patterns, designs })

const memo = new Map<string, number>()

function canBuildFromPatterns(design: string): number {
  if (memo.has(design)) return memo.get(design)!
  if (!design) return 1
  let count = 0
  for (const pattern of patterns) {
    if (design.startsWith(pattern)) {
      count += canBuildFromPatterns(design.slice(pattern.length))
    }
  }
  memo.set(design, count)
  return count
}

let possiblePatterns = 0
for (const design of designs) {
  possiblePatterns += canBuildFromPatterns(design)
}

console.log(possiblePatterns)
