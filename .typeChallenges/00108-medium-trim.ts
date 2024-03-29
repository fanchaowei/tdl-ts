// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
]

// ============= Your Code Here =============

type EmptyCode = ' ' | '\n' | '\t'

// type Trim<S extends string> = S extends `${EmptyCode}${infer R}`
//   ? Trim<R>
//   : S extends `${infer P}${EmptyCode}`
//   ? Trim<P>
//   : S

type Trim<S extends string> = S extends
  | `${EmptyCode}${infer R}`
  | `${infer R}${EmptyCode}`
  ? Trim<R>
  : S
