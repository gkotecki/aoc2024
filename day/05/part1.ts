import { textInput } from '../../shared.ts'

const input = textInput.split('\n\n')
const rules = input[0].split('\n').map((r) => r.split('|').map(Number))
const updates = input[1].split('\n').map((u) => u.split(',').map(Number))

console.log({ rules, updates })

const correctOrderUpdates = updates.filter((pages) => {
  for (const [before, after] of rules) {
    if (
      pages.includes(before) &&
      pages.includes(after) &&
      pages.indexOf(before) > pages.indexOf(after)
    ) {
      return false
    }
  }
  return true
})

const middleSum = correctOrderUpdates
  .map((pages) => pages[(pages.length / 2) | 0])
  .reduce((a, b) => a + b, 0)

console.log({ correctOrderUpdates, middleSum })
