// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: 'tesla'
        'model 3': 'model 3'
        'model X': 'model X'
        'model Y': 'model Y'
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>
  >
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>

// ============= Your Code Here =============
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P
}

// 由 js 代码得出，我们需要经历如下几个步骤
// 1. 返回一个对象
// 2. 遍历数组

// js
// function tupleToObject(array) {
//   const obj = {}

//   array.forEach((val) => {
//     obj[val] = val
//   })

//   return obj
// }
