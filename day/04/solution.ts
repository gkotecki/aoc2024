const lines = Deno.readTextFileSync('day/04/input-example.txt').trim().split('\n')
console.log({ lines })

const totalLines = lines.length
const totalCols = lines[0].length

let xmasCount = 0

// count horizontal
for (const line of lines) {
  xmasCount += line.match(/XMAS/g)?.length || 0
  xmasCount += line.match(/SAMX/g)?.length || 0
}

// count vertical
for (let i = 0; i < totalCols; i++) {
  const col = lines.map((line) => line[i]).join('')
  xmasCount += col.match(/XMAS/g)?.length || 0
  xmasCount += col.match(/SAMX/g)?.length || 0
}

// Primary diagonals (top-left to bottom-right)
// First row
for (let c = 0; c < totalCols; c++) {
  let diag = ''
  for (let k = 0; k < totalLines && c + k < totalCols; k++) {
    diag += lines[k][c + k]
  }
  if (diag.length >= 4) {
    xmasCount += diag.match(/XMAS/g)?.length || 0
    xmasCount += diag.match(/SAMX/g)?.length || 0
  }
}
// First column (excluding 0,0 as it's already counted)
for (let l = 1; l < totalLines; l++) {
  let diag = ''
  for (let k = 0; l + k < totalLines && k < totalCols; k++) {
    diag += lines[l + k][k]
  }
  if (diag.length >= 4) {
    xmasCount += diag.match(/XMAS/g)?.length || 0
    xmasCount += diag.match(/SAMX/g)?.length || 0
  }
}

// Secondary diagonals (top-right to bottom-left)
// First row
for (let c = 0; c < totalCols; c++) {
  let diag = ''
  for (let k = 0; k < totalLines && c - k >= 0; k++) {
    diag += lines[k][c - k]
  }
  if (diag.length >= 4) {
    xmasCount += diag.match(/XMAS/g)?.length || 0
    xmasCount += diag.match(/SAMX/g)?.length || 0
  }
}
// Last column (excluding 0,totalCols-1 as it's already counted)
for (let l = 1; l < totalLines; l++) {
  let diag = ''
  for (let k = 0; l + k < totalLines && totalCols - 1 - k >= 0; k++) {
    diag += lines[l + k][totalCols - 1 - k]
  }
  if (diag.length >= 4) {
    xmasCount += diag.match(/XMAS/g)?.length || 0
    xmasCount += diag.match(/SAMX/g)?.length || 0
  }
}

console.log({ xmasCount })
