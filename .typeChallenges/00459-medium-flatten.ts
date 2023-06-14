// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>,
      [{ foo: 'bar'; 2: 10 }, 'foobar']
    >
  >
]

// ============= Your Code Here =============
type DelArr<T> = T extends any[]
  ? T['length'] extends 1
    ? T extends [infer V]
      ? DelArr<V>
      : T
    : T
  : [T]

type Flatten<T extends any[], U extends any[] = []> = T extends [
  infer First,
  ...infer Other
]
  ? Flatten<[...Other], [...U, ...DelArr<First>]>
  : U
