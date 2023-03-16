import { expectType } from 'tsd'

type Factory<T> = T | number | string
type ResStatus<T extends number = 1000> = T extends 1000 | 1001 | 1002
  ? 'success'
  : 'failure'

// class Cat {
//   eat(): boolean {
//     return true
//   }
// }

// class Dog {
//   eat(): boolean {
//     return true
//   }
// }

function feedCat(cat: Cat) {}

// 报错！
feedCat(new Dog())

declare class TagProtector<T extends string> {
  protected __tag__: T
}
type Nominal<T, U extends string> = T & TagProtector<U>

export type CNY = Nominal<number, 'CNY'>

export type USD = Nominal<number, 'USD'>

const CNYCount = 100 as CNY

const USDCount = 100 as USD

function addCNY(source: CNY, input: CNY) {
  return (source + input) as CNY
}

addCNY(CNYCount, CNYCount)

// 报错了！
addCNY(CNYCount, USDCount)

type res = 'li' extends string ? 1 : 2

type Partial1<T> = {
  [P in keyof T]?: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Record<K extends keyof any, T> = {
  [P in K]: T
}

type record = Record<'li' | 'wang', 111>

type Omit1<T, K> = Pick<T, Exclude<keyof T, K>>
type Omit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// 这里就不能用严格 Omit 了
declare function combineSpread<T1, T2>(
  obj: T1,
  otherObj: T2,
  rest: Omit1<T1, keyof T2>
): void

type Point3d = { x: number; y: number; z: number }

declare const p1: Point3d

// 能够检测出错误，rest 中缺少了 y
combineSpread(p1, { x: 10 }, { z: 2 })

type test1 = Omit1<Point3d, keyof { x: 10 }>

type LastArrItem<T extends any[]> = T extends [...any, infer L] ? L : never
// 提取函数的参数值
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never
type LastParameter<T extends (...args: any) => any> = LastArrItem<Parameters<T>>

type LastParameterRes = LastParameter<
  (a: string, b: boolean, c: number) => void
>

type CustomHandler = (name: string, age: number) => void
// 返回值不是 void 却不报错
const handler1: CustomHandler = (name, age) => true
const handler2: CustomHandler = (name, age) => 'linbudu'
const handler3: CustomHandler = (name, age) => null
const handler4: CustomHandler = (name, age) => undefined

const result1 = handler1('linbudu', 599) // void
const result2 = handler2('linbudu', 599) // void
const result3 = handler3('linbudu', 599) // void
const result4 = handler4('linbudu', 599) // void

class Animal {
  asPet() {}
}
class Dog extends Animal {
  bark() {}
}
class Corgi extends Dog {
  cute() {}
}

type DogFactory = (args: Dog) => Corgi
function transformDogAndBark(dogFactory: DogFactory) {
  const dog = dogFactory(new Dog())
  dog.bark()
}

function fn(dog: Dog) {
  dog.bark()
}

type CorgiFunc = (input: Corgi) => void
type AnimalFunc = (input: Animal) => void
const func1: CorgiFunc = fn
const func2: AnimalFunc = fn

type DeepPartial<T> = {
  [K in keyof T]: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type DeepPartialStruct = DeepPartial<{
  foo: string
  nested: {
    nestedFoo: string
    nestedBar: {
      nestedBarFoo: string
    }
  }
}>

type MarkPropsAsOptional<T, K extends keyof T = keyof T> = Partial<Pick<T, K>> &
  Omit<T, K>
type Flatten<T> = { [K in keyof T]: T[K] }
type MarkPropsAsOptionalStruct = Flatten<
  MarkPropsAsOptional<
    {
      foo: string
      bar: number
      baz: boolean
    },
    'bar'
  >
>

type FuncStruct = (...args: any[]) => any

type FunctionPropKeys<T extends object, ValueType> = {
  [K in keyof T]-?: T[K] extends ValueType ? K : never
}[keyof T]
type FunctionKeys<T extends object> = FunctionPropKeys<T, FuncStruct>

expectType<
  FunctionKeys<{
    foo: () => void
    bar: () => number
    baz: number
  }>
>('foo')

expectType<
  FunctionKeys<{
    foo: () => void
    bar: () => number
    baz: number
  }>
  // 报错，因为 baz 不是函数类型属性
>('baz')

type Conditional<Value, Condition, Resolved, Rejected> = Value extends Condition
  ? Resolved
  : Rejected

export type ValueTypeFilter<
  T extends object,
  ValueType,
  Positive extends boolean
> = {
  [Key in keyof T]-?: T[Key] extends ValueType
    ? Conditional<Positive, true, Key, never>
    : Conditional<Positive, true, never, Key>
}[keyof T]

export type PickByValueType<T extends object, ValueType> = Pick<
  T,
  ValueTypeFilter<T, ValueType, true>
>

export type OmitByValueType<T extends object, ValueType> = Pick<
  T,
  ValueTypeFilter<T, ValueType, false>
>

interface VIP {
  vipExpires: number
}

interface CommonUser {
  promotionUsed: boolean
}

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

export type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T)

type XORUser = XOR<VIP, CommonUser>
type withoutUser = Flatten<Without<VIP, CommonUser> & CommonUser>
const user1: XORUser = {
  vipExpires: 599,
  promotionUsed: false,
}

// 并集
type Concurrence<A, B> = A | B
// 交集
type Intersection<A, B> = A extends B ? A : never
// 差集
type Difference<A, B> = A extends B ? never : A
// 补集
type Complement<A, B extends A> = Difference<A, B>

type PlainObjectType = Record<string, any>
// 并集
type ObjectKeysConcurrence<
  T extends PlainObjectType,
  K extends PlainObjectType
> = keyof T | keyof K
// 交集
type ObjectKeysIntersection<
  T extends PlainObjectType,
  K extends PlainObjectType
> = Intersection<keyof T, keyof K>
// 差集
type ObjectKeysDifference<
  T extends PlainObjectType,
  K extends PlainObjectType
> = Difference<keyof T, keyof K>
// 补集
type ObjectKeysComplement<T extends K, K extends PlainObjectType> = Complement<
  keyof T,
  keyof K
>
// 交集
type ObjectIntersection<
  T extends PlainObjectType,
  K extends PlainObjectType
> = Pick<T, ObjectKeysIntersection<T, K>>
// 差集
type ObjectDifference<
  T extends PlainObjectType,
  K extends PlainObjectType
> = Pick<T, ObjectKeysDifference<T, K>>
// 补集
type ObjectComplement<T extends K, K extends PlainObjectType> = Pick<
  T,
  ObjectKeysComplement<T, K>
>
// 并集
type Assign<
  T extends PlainObjectType,
  K extends PlainObjectType
> = ObjectDifference<T, K> & ObjectIntersection<T, K> & ObjectDifference<K, T>

type FunctionType = (...args: any) => any
type FuncParams<T extends FunctionType> = T extends (arg: infer P) => any
  ? P
  : T extends (...args: infer R) => any
  ? R extends [...any, infer last]
    ? last
    : never
  : never
type FuncTest = (num: number, str: string) => any
type FuncTestRes = FuncParams<FuncTest>

declare let v1: `${number}.${number}.${number}`
declare let v2: '1.2.4'
v1 = v2
v2 = v1 // 报错

interface Foo {
  name: string
  age: number
  job: Job
}
interface Job {
  work: any
}
type ChangeListener = {
  on: (change: `${keyof Foo}changed`) => void
}
declare let listener: ChangeListener
listener.on('')

type ReverseName<Str extends string> =
  Str extends `${infer First} ${infer Last}`
    ? `${Capitalize<First>} ${Last}`
    : Str
