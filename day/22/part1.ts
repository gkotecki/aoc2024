import { textInput } from '../../shared.ts'

const inputs = textInput.split('\n').map(Number)

console.log({ inputs })

const mix = (secret: number, value: number) => Number(BigInt(secret) ^ BigInt(value))
const prune = (secret: number) => secret % 16777216

const getNext = (secret: number) => {
  secret = prune(mix(secret, secret * 64))
  secret = prune(mix(secret, Math.floor(secret / 32)))
  secret = prune(mix(secret, secret * 2048))
  return secret
}

function findSecret(secret: number) {
  for (let index = 0; index < 2000; index++) {
    secret = getNext(secret)
  }
  return secret
}

let sum = 0
for (const secret of inputs) {
  const newSecret = findSecret(secret)
  console.log({ newSecret })
  sum += newSecret
}
console.log({ sum })
