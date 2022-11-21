// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

// ============= Your Code Here =============

// extends 继承
// keyof 将 K 与 T 中的 key 进行对比
type MyPick<T, K extends keyof T> = {
  //[P in K]，类似与循环，参考下面 js 的 forEach
  // 这段的意思是遍历 K ，并且遍历的 key 值 P 对应的 value 是 T[P]
  [P in K]: T[P]
}

// 涉及知识点(在官方文档中搜索查看)：
// 1. mapped: 遍历 ([P in K])
// 2. indexed: 取值 (T[P])
// 3. lookup: 取 key (keyof)
// 4. Generic Constraints: 即本题的 extends, 在 < > 内是类型约束，类似上面 K 约束为 T 的 key (K extends keyof T)

// 对比学习法，先写一个 js 的解决方案，然后转化为 ts
function MyPick(todo, keys) {
  const obj = {}

  keys.forEach((key) => {
    if (key in todo) {
      obj[key] = todo[key]
    }
  })

  return obj
}
