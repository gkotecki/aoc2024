export const day = Deno.args[0].padStart(2, '0')
export const part = Deno.args[1]
export const inputSuffix = Deno.args[2]

const inputPath = `day/${day}/input${inputSuffix ? `-${inputSuffix}` : ''}.txt`
export const textInput = Deno.readTextFileSync(inputPath).trim()

export function printMatrix(matrix: (number | string)[][]) {
  const uniqueChars = new Set(matrix.flat())
  const colorMap = new Map(
    Array.from(uniqueChars).map((char, index) => [char, `\x1b[48;5;${index + 0}m`]),
  )
  matrix.forEach((row) => {
    const paintedRow = row.map((cell) => `${colorMap.get(cell)} ${cell} `).join('')
    console.log(paintedRow)
  })
  console.log('\x1b[0m') // reset
}
