export const day = Deno.args[0].padStart(2, '0')
export const part = Deno.args[1]

export const textInput = Deno.readTextFileSync(`day/${day}/input.txt`).trim()