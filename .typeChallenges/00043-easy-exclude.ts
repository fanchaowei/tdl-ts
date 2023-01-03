// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<
    Equal<MyExclude<string | number | (() => void), Function>, string | number>
  >
]

// ============= Your Code Here =============
type MyExclude<T, U> = T extends U ? never : T
// 循环 T 与 U 进行对比，如果存在则输出 never，不存在输出 T
// 注意这里的 extends ，当类型为联合类型时，extends 就是对比

// js
function myExclude(T: any, U: any) {
  const res = T.filter((item: any) => {
    const index = U.indexOf(item)
    return index === -1
  })
  return res
}
