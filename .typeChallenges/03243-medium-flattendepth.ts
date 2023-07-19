// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
]

// ============= Your Code Here =============

type FlattenDepth<
  T extends any[],
  U extends number = 1,
  N extends number[] = []
> = N['length'] extends U
  ? T
  : T extends [infer S, ...infer L]
  ? S extends any[]
    ? [...FlattenDepth<S, U, [...N, 1]>, ...FlattenDepth<L, U, [...N]>]
    : [S, ...FlattenDepth<L, U, [...N]>]
  : T

// 这道题我们应该分成三个步骤
// 第一步我们想着如何拆分一次
type FlattenDepthStep1<T extends any[]> = T extends [infer S, ...infer L]
  ? S extends any[]
    ? [...S, ...FlattenDepthStep1<L>]
    : [S, ...FlattenDepthStep1<L>]
  : T
// 第二步，我们实现拆分多次
type FlattenDepthStep2<T extends any[]> = T extends [infer S, ...infer L]
  ? S extends any[]
    ? [...FlattenDepthStep2<S>, ...FlattenDepthStep2<L>]
    : [S, ...FlattenDepthStep2<L>]
  : T
// 最后，我们实现拆分指定次数，加上数组 N ，用他的长度来判断是否达到指定次数
