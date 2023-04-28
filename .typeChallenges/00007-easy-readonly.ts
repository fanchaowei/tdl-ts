// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

// ============= Your Code Here =============
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

// 涉及知识点
// mapped
// lookup
// readonly: 只读
// indexed

// js 实现
// function readonly(obj) {
//   const result = {}

//   for (const key in obj) {
//     result['readonly' + key] = obj[key]
//   }

//   return result
// }
