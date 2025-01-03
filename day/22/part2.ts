import { textInput } from '../../shared.ts'

const inputs = textInput.split('\n').map(Number)
// const inputs = [123]

console.log({ inputs })

const mix = (secret: number, value: number) => Number(BigInt(secret) ^ BigInt(value))
const prune = (secret: number) => secret % 16777216

const getNext = (secret: number) => {
  secret = prune(mix(secret, secret * 64))
  secret = prune(mix(secret, Math.floor(secret / 32)))
  secret = prune(mix(secret, secret * 2048))
  return secret
}

const priceMap = new Map<number, Map<string, number>>()
const aggPriceMap = new Map<string, number>()

function findSecret(secret: number) {
  const secretMap = new Map<string, number>()
  let lastFive = [0, 0, 0, 0, 0] as number[]
  for (let index = 0; index < 2000; index++) {
    const price = secret % 10
    lastFive = [price, lastFive[0] || 0, lastFive[1] || 0, lastFive[2] || 0, lastFive[3] || 0]
    const diffs = lastFive
      .map((x, i) => x - (lastFive[i + 1] || 0))
      .slice(0, 4)
      .join(',')
    // console.log(price, lastFive.join(), diffs, 'from', secret)
    if (!secretMap.has(diffs)) secretMap.set(diffs, price)
    secret = getNext(secret)
  }
  return secretMap
}

for (const secret of inputs) {
  console.log('>> initial secret', secret)
  const secretMap = findSecret(secret)
  priceMap.set(secret, secretMap)

  for (const [key, value] of secretMap) {
    const aggValue = aggPriceMap.get(key) || 0
    aggPriceMap.set(key, aggValue + value)
  }
}

const sortedMap = new Map([...aggPriceMap.entries()].sort((a, b) => b[1] - a[1]))
console.log('Sorted map:', sortedMap)

/**
 * part 2 tries:
 * 3062 too high
 *
 * 2189 ok! >> check sorted map, grab last from non-initials
 */