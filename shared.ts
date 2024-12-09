export const day = Deno.args[0].padStart(2, '0')
export const part = Deno.args[1]
export const inputSuffix = Deno.args[2]

const inputPath = `day/${day}/input${inputSuffix ? `-${inputSuffix}` : ''}.txt`
export const textInput = Deno.readTextFileSync(inputPath).trim()
