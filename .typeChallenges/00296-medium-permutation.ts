// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<
    Equal<
      Permutation<'A' | 'B' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<
    Equal<
      Permutation<'B' | 'A' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
]

// ============= Your Code Here =============
type Permutation<T, C = T> = [T] extends [never]
  ? []
  : T extends C
  ? [T, ...Permutation<Exclude<C, T>>]
  : never

// 我们来做一下分析
// 首先传入 A | B | C
// 通过 extends 判定最后走到 [T, ...Permutation<Exclude<C, T>>] 这步，带入 A | B | C 则变为如下：
// [A, ...Permutation<Exclude<A | B | C, A>>] | [B, ...Permutation<Exclude<A | B | C, B>>] | [C, ...Permutation<Exclude<A | B | C, C>>]
// 我们拿 [A, ...Permutation<Exclude<A | B | C, A>>] 继续分析
// 处理了 Exclude 后，就是 [A, ...Permutation<Exclude<B | C>>]
// 然后我们继续走入下一步，得到 [A, ...[B, ...Permutation<Exclude<B | C, B>>]] | [A. ...[C, ...Permutation<Exclude<B | C, C>>]]
// 我们继续取第一个分析
// 结算了 Exclude 之后，就是 [A, ...[B, ...Permutation<C>]]
// 我们继续处理里面的 Permutation<C>
// 得到 [A, ...[B, ...[C, ...Permutation<Exclude<C, C>>]]]，即 [A, ...[B, ...[C, ...Permutation<never>]]]
// 这时候，我们的 [T] extends [never] 就起作用了
// 最终得到 [A, ...[B, ...[C, ...[]]]] ，即 [A, B, C]
