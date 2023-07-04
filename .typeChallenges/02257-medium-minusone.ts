// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
]

// ============= Your Code Here =============
// 将字符串反转
type ReverseString<T extends string> = T extends `${infer F}${infer L}`
  ? `${ReverseString<L>}${F}`
  : ''
// 将字符串转换为数字
type ParseInt<T extends string> = T extends `${infer R extends number}` ? R : T
// 正数减法计算用
type PosNumArr = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8]
// 负数减法计算用
type NegaNumArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
// 减法
type SubNumber<T extends string> =
  T extends `${infer F extends number}${infer L}`
    ? F extends 0
      ? L extends ''
        ? `${NegaNumArr[F]}-`
        : `9${SubNumber<L>}`
      : `${PosNumArr[F]}${L}`
    : T
// 排除多余的 0
type DelZero<T extends string> = T extends `${infer F}${infer L}`
  ? F extends '0'
    ? DelZero<L>
    : T
  : '0'
type MinusOne<T extends number> = ParseInt<
  DelZero<ReverseString<SubNumber<ReverseString<`${T}`>>>>
>
