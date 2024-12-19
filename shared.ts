export const day = Deno.args[0].padStart(2, '0')
export const part = Deno.args[1]
export const inputSuffix = Deno.args[2]

const inputPath = `day/${day}/input${inputSuffix ? `-${inputSuffix}` : ''}.txt`
export const textInput = Deno.readTextFileSync(inputPath).trim()

export function printMatrix(
  matrix: (number | string)[][],
  options: { printCoords?: boolean } = {},
) {
  options.printCoords = true

  const uniqueChars = [...new Set(matrix.flat())].toSorted()
  const maxCharLength = Math.max(...uniqueChars.map((char) => char.toString().length), 3)
  const padded = (str: string) => str.padEnd(((maxCharLength + 1) / 2) | 0).padStart(maxCharLength)

  const colorMap = new Map(
    Array.from(uniqueChars).map((char, index) => [char, `\x1b[48;5;${index + 0}m`]),
  )
  if (options?.printCoords) {
    const colIndexes = matrix[0].map((_, i) => padded(i.toString())).join('')
    console.log('   ' + colIndexes)
  }
  matrix.forEach((row, rowIndex) => {
    const paintedRow = row
      .map((cell) => {
        return `${colorMap.get(cell)}${padded(cell.toString())}`
      })
      .join('')

    console.log(
      `\x1b[0m${options?.printCoords ? rowIndex.toString().padStart(2) : ''} ${paintedRow}`,
    )
  })
  console.log('\x1b[0m') // reset
}
