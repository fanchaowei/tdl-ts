// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>
]

// ============= Your Code Here =============

// 推荐去答案去看第一个答案，有详细的推导过程
// 这里学到的一点是
// 当前面 T extends T ，T 如果是联合类型就会拆分开分别判断
// 后面的 C extends T 的 T 也会拆分开
type Handle<T, C> = T extends T ? (C extends T ? true : unknown) : never

type IsUnion<T, C extends T = T> = Handle<T, C> extends true ? false : true
