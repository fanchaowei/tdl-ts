// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>
]

// ============= Your Code Here =============

// 自己的答案，偏繁琐
// type KebabCase<S extends string> = S extends `${infer Head}${''}${infer Others}`
//   ? Head extends Lowercase<Head>
//     ? `${Head}${FollowKebabCase<Others>}`
//     : `${Lowercase<Head>}${FollowKebabCase<Others>}`
//   : S
// type FollowKebabCase<S extends string> =
//   S extends `${infer Head}${''}${infer Others}`
//     ? Head extends Lowercase<Head>
//       ? `${Head}${FollowKebabCase<Others>}`
//       : `-${Lowercase<Head>}${FollowKebabCase<Others>}`
//     : S

// 最佳答案
type KebabCase<S extends string> = S extends `${infer Head}${infer Others}`
  ? Others extends Uncapitalize<Others>
    ? `${Lowercase<Head>}${KebabCase<Others>}`
    : `${Lowercase<Head>}-${KebabCase<Others>}`
  : S
