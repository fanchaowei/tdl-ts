// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>
]

// ============= Your Code Here =============
type DropChar<
  S extends string,
  C extends string,
  P extends string = ''
> = S extends `${infer F}${infer L}`
  ? F extends C
    ? DropChar<L, C, P>
    : DropChar<L, C, `${P}${F}`>
  : P