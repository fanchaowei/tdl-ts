// 复习
type MyPick1<T, K extends keyof T> = {
  [P in K]: T[P]
}

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P
}

type HelloWorld1 = string

type MyFirst<T extends any[]> = T extends [] ? never : T[0]
