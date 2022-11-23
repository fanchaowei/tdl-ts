// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>
]

// ============= Your Code Here =============

// 解法一：判断 T 是否等于 []
// type First<T extends any[]> = T extends [] ? never : T[0]

// 解法二：判断 T 的长度是否为 0
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]

// js
// const first = (arr) => {
//   if (arr.length === 0) {
//     return `never`
//   }
//   return arr[0]
// }

// 解法三：因为如果 T 是空数组， T[number] 返回的是 never，T[0] 返回 undefined。利用这一点来做判断
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never

// 解法四：将数组 T 解构，然后判断第一个索引值 First 是否有值，有则输出，没有则输出 never
type First<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First
  : never

// js
const first = (arr) => {
  const [first, ...rest] = arr
  return first ? first : 'never'
}
