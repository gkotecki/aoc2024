import { textInput } from '../../shared.ts'

const input = textInput.split('\n\n')
const rules = input[0].split('\n').map((r) => r.split('|').map(Number))
const updates = input[1].split('\n').map((u) => u.split(',').map(Number))

console.log({ rules, updates })

const incorrectOrderUpdates = updates.filter((pages) => {
  for (const [before, after] of rules) {
    if (
      pages.includes(before) &&
      pages.includes(after) &&
      pages.indexOf(before) > pages.indexOf(after)
    ) {
      return true
    }
  }
  return false
})

const reorderHelper = (pages: number[]): number[] => {
  for (const [before, after] of rules) {
    if (
      pages.includes(before) &&
      pages.includes(after) &&
      pages.indexOf(before) > pages.indexOf(after)
    ) {
      const beforeIndex = pages.indexOf(before)
      const afterIndex = pages.indexOf(after)
      const newPages = [...pages]
      newPages[beforeIndex] = after
      newPages[afterIndex] = before
      return newPages
    }
  }
  return pages
}
const reorderedUpdates = incorrectOrderUpdates
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)
  .map(reorderHelper)

const middleSum = reorderedUpdates
  .map((pages) => pages[(pages.length / 2) | 0])
  .reduce((a, b) => a + b, 0)

console.log({ incorrectOrderUpdates, reorderedUpdates, middleSum })
