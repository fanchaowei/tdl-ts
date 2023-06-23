// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
]

// ============= Your Code Here =============
// 自己的答案
// type Diff<O, O1> = {
//   [P in GetKey<O, O1>]: P extends keyof O
//     ? O[P]
//     : P extends keyof O1
//     ? O1[P]
//     : never
// }
// type GetKey<O, O1> = Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>

// 参考答案
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>
// 答：
// Omit 传入两个类型，第一个类型是一个对象，第二个类型是联合类型
// 作用是从对象中剔除掉联合类型中的属性，返回剩余的属性
// 我们第一个参数传入 O & O1，就是把两个对象合并成一个对象
// 第二个参数传入 keyof(O | O1)，这个 keyof(O | O1) 返回的是 O 和 O1 共同存在的属性, 也就是交集
// 这样我们就实现了从 O & O1 中剔除掉 O 和 O1 共同存在的属性，返回剩余的属性
