// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
]

// ============= Your Code Here =============
// 注意，如果直接 T extends never 的话，这个条件没有意义，never 代表什么都没有，所以 IsNever<never> 的结果会返回 never。never extends never 这个判断没有意义。
// 所以我们需要用 [T] extends [never] 来判断 T 是否为 never
type IsNever<T> = [T] extends [never] ? true : false
