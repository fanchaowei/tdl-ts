// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>
]

// ============= Your Code Here =============

// 自己的解答
// type IsAddOrSub<T extends string> = T extends '+' | '-' ? T : ''
// type GetPercent<T extends string> = T extends `${infer F}${infer L}`
//   ? F extends '%'
//     ? T
//     : GetPercent<L>
//   : ''
// type GetNumber<
//   T extends string,
//   U extends string = ''
// > = T extends `${infer F}${infer L}`
//   ? F extends '+' | '-'
//     ? GetNumber<L, U>
//     : F extends '%'
//     ? U
//     : GetNumber<L, `${U}${F}`>
//   : U
// type PercentageParser<A extends string> = A extends `${infer F}${infer L}`
//   ? [IsAddOrSub<F>, GetNumber<A>, GetPercent<A>]
//   : ['', '', '']

// 优秀答案
type IsAddOrSub<T extends string> = T extends '+' | '-' ? T : ''
type CheckPercent<T extends string> = T extends `${infer F}%`
  ? [F, '%']
  : [T, '']
type PercentageParser<A extends string> = A extends `${IsAddOrSub<
  infer F
>}${infer L}`
  ? [F, ...CheckPercent<L>]
  : ['', ...CheckPercent<A>]
