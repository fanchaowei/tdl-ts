// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<
    Equal<
      StringToUnion<'coronavirus'>,
      'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'
    >
  >
]

// ============= Your Code Here =============
type StringToUnion<
  T extends string,
  U extends any[] = []
> = T extends `${infer First}${infer Other}`
  ? StringToUnion<Other, [...U, First]>
  : U['length'] extends 0
  ? T extends ''
    ? never
    : T
  : U[number]
