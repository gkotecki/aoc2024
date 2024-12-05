const lines = Deno.readTextFileSync('day/04/input.txt').trim().split('\n')
console.log({ lines })

const totalLines = lines.length
const totalCols = lines[0].length

let xmasCount = 0

for (let l = 0; l < totalLines; l++) {
  for (let c = 0; c < totalCols; c++) {
    if (l == 0 || c == 0 || l == totalLines - 1 || c == totalCols - 1) continue
    if (lines[c][l] !== 'A') continue

    if (
      (lines[c - 1][l - 1] == 'M' && lines[c + 1][l + 1] == 'S') ||
      (lines[c - 1][l - 1] == 'S' && lines[c + 1][l + 1] == 'M')
    ) {
      if (
        (lines[c + 1][l - 1] == 'M' && lines[c - 1][l + 1] == 'S') ||
        (lines[c + 1][l - 1] == 'S' && lines[c - 1][l + 1] == 'M')
      ) {
        xmasCount += 1
      }
    }
  }
}

console.log({ xmasCount })
