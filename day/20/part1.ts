import { printMatrix, textInput } from '../../shared.ts'

const grid = textInput.split('\n').map((row) => row.split(''))

printMatrix(grid)

type Point = {
  x: number
  y: number
}

class Node {
  position: Point
  g: number // Cost from start to current node
  h: number // Heuristic cost to end
  f: number // Total cost (g + h)
  parent: Node | null

  constructor(pos: Point, g: number, h: number, parent: Node | null = null) {
    this.position = pos
    this.g = g
    this.h = h
    this.f = g + h
    this.parent = parent
  }
}

function manhattanDistance(p1: Point, p2: Point): number {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

function getNeighbors(point: Point, grid: string[][]): Point[] {
  const directions = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ]
  return directions
    .map((dir) => ({ x: point.x + dir.x, y: point.y + dir.y }))
    .filter(
      (p) =>
        p.x >= 0 && p.x < grid[0].length && p.y >= 0 && p.y < grid.length && grid[p.y][p.x] !== '#',
    )
}

function findPath(grid: string[][]): Point[] {
  let start: Point = { x: 0, y: 0 }
  let end: Point = { x: 0, y: 0 }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'S') start = { x, y }
      if (grid[y][x] === 'E') end = { x, y }
    }
  }

  const openSet: Node[] = []
  const closedSet: Set<string> = new Set()
  const startNode = new Node(start, 0, manhattanDistance(start, end))
  openSet.push(startNode)

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f)
    const current = openSet.shift()!

    if (current.position.x === end.x && current.position.y === end.y) {
      const path: Point[] = []
      let currentNode: Node | null = current
      while (currentNode !== null) {
        path.unshift(currentNode.position)
        currentNode = currentNode.parent
      }
      return path
    }

    closedSet.add(`${current.position.x},${current.position.y}`)

    for (const neighbor of getNeighbors(current.position, grid)) {
      if (closedSet.has(`${neighbor.x},${neighbor.y}`)) continue

      const g = current.g + 1
      const h = manhattanDistance(neighbor, end)
      const neighborNode = new Node(neighbor, g, h, current)

      if (
        !openSet.some(
          (node) =>
            node.position.x === neighbor.x &&
            node.position.y === neighbor.y &&
            node.f < neighborNode.f,
        )
      ) {
        openSet.push(neighborNode)
      }
    }
  }

  return [] // No path found
}

const shortestTime = findPath(grid).length - 1
console.log('Shortest initial time:', shortestTime)

// const timeSavings: { [key: string]: number } = {}

// for (let r = 1; r < grid.length - 1; r++) {
//   console.log('checking row', r)
//   for (let c = 1; c < grid[0].length - 1; c++) {
//     if (grid[r][c] !== '#') continue
//     const newGrid = structuredClone(grid)
//     newGrid[r][c] = '.'

//     const savedTime = shortestTime - (findPath(newGrid).length - 1)
//     if (!savedTime) continue
//     timeSavings[savedTime] ??= 0
//     timeSavings[savedTime] += 1

//     // const visualGrid = structuredClone(grid)
//     // path.forEach(({ x, y }) => {
//     //   if (visualGrid[y][x] !== 'S' && visualGrid[y][x] !== 'E') {
//     //     visualGrid[y][x] = '*'
//     //   }
//     // })
//     // printMatrix(visualGrid)
//   }
// }

const timeSavings = {
  '2': 939,
  '4': 939,
  '6': 280,
  '8': 421,
  '10': 196,
  '12': 323,
  '14': 141,
  '16': 238,
  '18': 106,
  '20': 188,
  '22': 77,
  '24': 150,
  '26': 61,
  '28': 127,
  '30': 56,
  '32': 111,
  '34': 47,
  '36': 82,
  '38': 29,
  '40': 74,
  '42': 31,
  '44': 74,
  '46': 28,
  '48': 70,
  '50': 36,
  '52': 61,
  '54': 19,
  '56': 43,
  '58': 20,
  '60': 46,
  '62': 27,
  '64': 45,
  '66': 20,
  '68': 47,
  '70': 16,
  '72': 47,
  '74': 27,
  '76': 48,
  '78': 20,
  '80': 35,
  '82': 16,
  '84': 37,
  '86': 12,
  '88': 27,
  '90': 10,
  '92': 33,
  '94': 11,
  '96': 26,
  '98': 11,
  '100': 26,
  '102': 12,
  '104': 25,
  '106': 10,
  '108': 26,
  '110': 8,
  '112': 20,
  '114': 5,
  '116': 14,
  '118': 6,
  '120': 16,
  '122': 5,
  '124': 12,
  '126': 4,
  '128': 18,
  '130': 8,
  '132': 16,
  '134': 9,
  '136': 19,
  '138': 7,
  '140': 13,
  '142': 7,
  '144': 15,
  '146': 6,
  '148': 15,
  '150': 8,
  '152': 14,
  '154': 6,
  '156': 14,
  '158': 4,
  '160': 14,
  '162': 6,
  '164': 14,
  '166': 8,
  '168': 15,
  '170': 4,
  '172': 9,
  '174': 3,
  '176': 13,
  '178': 4,
  '180': 9,
  '182': 3,
  '184': 10,
  '186': 6,
  '188': 10,
  '190': 3,
  '192': 8,
  '194': 4,
  '196': 8,
  '198': 3,
  '200': 8,
  '202': 5,
  '204': 10,
  '206': 3,
  '208': 8,
  '210': 3,
  '212': 9,
  '214': 4,
  '216': 16,
  '218': 8,
  '220': 8,
  '224': 7,
  '226': 1,
  '228': 5,
  '230': 3,
  '232': 6,
  '234': 1,
  '236': 8,
  '238': 6,
  '240': 8,
  '242': 2,
  '244': 3,
  '246': 2,
  '248': 9,
  '250': 4,
  '252': 8,
  '254': 4,
  '256': 7,
  '264': 4,
  '266': 3,
  '268': 4,
  '270': 1,
  '272': 3,
  '274': 2,
  '276': 8,
  '278': 6,
  '280': 9,
  '282': 3,
  '284': 8,
  '286': 3,
  '288': 6,
  '290': 3,
  '292': 6,
  '294': 1,
  '296': 3,
  '298': 1,
  '300': 3,
  '304': 2,
  '306': 1,
  '308': 2,
  '312': 3,
  '314': 3,
  '316': 4,
  '318': 1,
  '320': 3,
  '322': 2,
  '324': 5,
  '326': 2,
  '328': 6,
  '332': 2,
  '336': 5,
  '338': 1,
  '340': 6,
  '342': 3,
  '344': 5,
  '346': 1,
  '348': 5,
  '350': 2,
  '352': 4,
  '354': 1,
  '356': 1,
  '360': 5,
  '362': 1,
  '364': 3,
  '366': 2,
  '368': 2,
  '372': 1,
  '374': 1,
  '376': 3,
  '378': 3,
  '380': 4,
  '382': 2,
  '384': 5,
  '386': 3,
  '388': 7,
  '390': 3,
  '392': 5,
  '394': 3,
  '396': 4,
  '398': 2,
  '400': 5,
  '402': 3,
  '404': 4,
  '406': 2,
  '408': 5,
  '410': 2,
  '412': 4,
  '414': 1,
  '416': 6,
  '418': 1,
  '420': 5,
  '424': 6,
  '426': 2,
  '428': 5,
  '430': 2,
  '432': 3,
  '434': 1,
  '436': 2,
  '438': 1,
  '440': 5,
  '442': 4,
  '444': 7,
  '446': 1,
  '448': 2,
  '450': 2,
  '452': 4,
  '454': 1,
  '456': 6,
  '458': 2,
  '460': 6,
  '462': 4,
  '464': 5,
  '466': 1,
  '468': 3,
  '470': 2,
  '472': 3,
  '474': 1,
  '476': 1,
  '484': 2,
  '486': 2,
  '488': 2,
  '492': 1,
  '496': 3,
  '498': 1,
  '500': 3,
  '502': 2,
  '504': 3,
  '506': 1,
  '508': 2,
  '510': 1,
  '512': 3,
  '514': 2,
  '516': 2,
  '520': 1,
  '522': 1,
  '524': 1,
  '528': 1,
  '532': 1,
  '534': 1,
  '536': 4,
  '538': 2,
  '540': 2,
  '544': 1,
  '548': 3,
  '550': 2,
  '552': 4,
  '554': 2,
  '556': 2,
  '560': 2,
  '562': 1,
  '564': 2,
  '566': 1,
  '568': 1,
  '576': 1,
  '578': 1,
  '580': 3,
  '582': 2,
  '584': 3,
  '586': 1,
  '588': 1,
  '596': 2,
  '598': 1,
  '600': 1,
  '602': 1,
  '604': 1,
  '606': 1,
  '608': 1,
  '612': 2,
  '616': 1,
  '624': 1,
  '628': 1,
  '630': 1,
  '632': 1,
  '636': 1,
  '638': 1,
  '640': 2,
  '644': 2,
  '648': 1,
  '650': 1,
  '652': 1,
  '660': 1,
  '692': 1,
  '694': 1,
  '696': 3,
  '698': 1,
  '700': 2,
  '702': 1,
  '704': 1,
  '716': 1,
  '720': 1,
  '722': 1,
  '724': 2,
  '752': 1,
  '754': 1,
  '756': 1,
  '758': 1,
  '760': 1,
  '776': 1,
  '778': 1,
  '780': 1,
  '782': 1,
  '784': 1,
  '800': 1,
  '816': 1,
  '824': 1,
  '826': 1,
  '828': 1,
  '830': 1,
  '832': 1,
  '844': 1,
  '848': 2,
  '850': 1,
  '852': 1,
  '856': 1,
  '858': 1,
  '860': 1,
  '876': 1,
  '878': 1,
  '880': 1,
  '892': 1,
  '912': 2,
  '914': 1,
  '916': 1,
  '918': 1,
  '920': 1,
  '936': 1,
  '938': 1,
  '940': 1,
  '956': 1,
  '972': 1,
  '974': 1,
  '976': 1,
  '984': 1,
  '986': 1,
  '988': 1,
  '990': 1,
  '992': 2,
  '994': 1,
  '996': 1,
  '1016': 1,
  '1018': 1,
  '1020': 1,
  '1028': 1,
  '1030': 1,
  '1032': 1,
  '1040': 2,
  '1042': 1,
  '1044': 1,
  '1046': 1,
  '1048': 1,
  '1050': 1,
  '1052': 2,
  '1054': 1,
  '1056': 1,
  '1076': 1,
  '1078': 1,
  '1080': 1,
  '1088': 1,
  '1096': 1,
  '1098': 1,
  '1100': 1,
  '1260': 1,
  '1262': 1,
  '1264': 1,
  '1428': 2,
  '1430': 1,
  '1432': 2,
  '1434': 1,
  '1436': 1,
  '1440': 1,
  '1442': 1,
  '1444': 1,
  '1456': 1,
  '1460': 2,
  '1462': 1,
  '1464': 1,
  '1512': 1,
  '1514': 1,
  '1516': 1,
  '1692': 1,
  '1700': 1,
  '1702': 1,
  '1704': 1,
  '1706': 1,
  '1708': 1,
  '1710': 1,
  '1712': 2,
  '1716': 1,
  '1724': 1,
  '1726': 1,
  '1728': 1,
  '1730': 1,
  '1732': 1,
  '1734': 1,
  '1736': 1,
  '1876': 1,
  '1884': 1,
  '1886': 1,
  '1888': 1,
  '1890': 1,
  '1892': 1,
  '2152': 1,
  '2154': 1,
  '2156': 1,
  '2160': 1,
  '2168': 1,
  '2200': 1,
  '2202': 1,
  '2204': 1,
  '2206': 1,
  '2208': 1,
  '2340': 1,
  '2580': 1,
  '2588': 1,
  '2590': 1,
  '2592': 1,
  '2616': 1,
  '2618': 1,
  '2620': 1,
  '2622': 1,
  '2624': 1,
  '4968': 1,
  '4970': 1,
  '4972': 1,
  '5152': 1,
  '5154': 1,
  '5156': 1,
  '5160': 1,
  '5164': 1,
  '5204': 1,
  '5206': 1,
  '5208': 1,
  '5232': 1,
  '7120': 1,
  '7200': 1,
  '7202': 1,
  '7204': 1,
  '7206': 1,
  '7208': 1,
  '7676': 1,
  '8904': 1,
  '8906': 1,
  '8908': 1,
  '8910': 1,
  '8912': 1,
  '8920': 1,
  '8922': 1,
  '8924': 1,
  '8928': 1,
  '8952': 1,
  '8954': 1,
  '8956': 1,
  '9180': 1,
  '9182': 1,
  '9184': 1,
  '9186': 1,
  '9188': 1,
  '9190': 1,
  '9192': 1,
  '9196': 1,
  '9200': 1,
  '9202': 1,
  '9204': 1,
  '9280': 1,
  '9282': 1,
  '9284': 1,
  '9296': 1,
  '9298': 1,
  '9300': 1,
}

console.log(timeSavings)

const over100 = Object.entries(timeSavings).filter(([timeSaved, count]) => +timeSaved >= 100)
const count = over100.reduce((acc, [, count]) => acc + count, 0)

console.log({ count })
