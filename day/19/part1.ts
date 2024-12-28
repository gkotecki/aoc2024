import { textInput } from '../../shared.ts'

const [patternsStr, designsStr] = textInput.split('\n\n')
const patterns = patternsStr.split(', ')
const designs = designsStr.split('\n')

console.log({ patterns, designs })

const memo = new Map<string, boolean>()

function canBuildFromPatterns(design: string): boolean {
  if (memo.has(design)) return memo.get(design)!
  if (!design) return true
  for (const pattern of patterns) {
    if (design.startsWith(pattern)) {
      if (canBuildFromPatterns(design.slice(pattern.length))) {
        memo.set(design, true)
        return true
      }
    }
  }
  memo.set(design, false)
  return false
}

const possiblePatterns = designs.filter((design) => {
  console.log({ design })
  return canBuildFromPatterns(design)
})

console.log(possiblePatterns)
console.log(possiblePatterns.length)
