// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT'
] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>
]

// ============= Your Code Here =============
type Length<T extends readonly any[]> = T['length']

// 知识点：
// 什么是 tuple 类型？ 简单来说， tuple 类型就是一个定长且内部元素定类型的数组，类似 [string, number] ，长度为 2 且第一个元素是 string、第二个元素为 number

// js
function getLength(arr: any) {
  if (Array.isArray(arr)) {
    return arr.length
  }
  return
}
