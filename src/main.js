// @flow

export class End {}
export type $End = Class<End>

export type $List<A, B: $List<any, any> | $End> = [A, B]

// convienence types for creating lists of various lengths
export type $1List<A> = $List<A, $End>
export type $2List<A, B> = $List<A, $1List<B>>
export type $3List<A, B, C> = $List<A, $2List<B, C>>
export type $4List<A, B, C, D> = $List<A, $3List<B, C, D>>
export type $5List<A, B, C, D, E> = $List<A, $4List<B, C, D, E>>
export type $6List<A, B, C, D, E, F> = $List<A, $5List<B, C, D, E, F>>

export const list1 = <A>(a: A): $1List<A> => [ a, End ];
export const list2 = <A, B>(a: A, b: B): $2List<A, B> => [ a, list1(b) ];
export const list3 = <A, B, C>(a: A, b: B, c: C): $3List<A, B, C> => [ a, list2(b, c) ];
export const list4 = <A, B, C, D>(a: A, b: B, c: C, d: D): $4List<A, B, C, D> => [ a, list3(b, c, d) ];
export const list5 = <A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): $5List<A, B, C, D, E> => [ a, list4(b, c, d, e) ];
export const list6 = <A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): $6List<A, B, C, D, E, F> => [ a, list5(b, c, d, e, f) ];

// extracts the head type of a list
type $_Head<A, T: $List<A, any>> = A
export type $Head<T> = $_Head<*, T>

// extracts the tail list of a list
type $_Tail<B, T: $List<any, B>> = B
export type $Tail<T> = $_Tail<*, T>

// convienence methods for extracting types
export type $T1<T> = $Head<T>
export type $T2<T> = $Head<$Tail<T>>
export type $T3<T> = $Head<$Tail<$Tail<T>>>
export type $T4<T> = $Head<$Tail<$Tail<$Tail<T>>>>
export type $T5<T> = $Head<$Tail<$Tail<$Tail<$Tail<T>>>>>
export type $T6<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>

// creates a union of the types in the list
type $_Union<A, B, T: $List<A, B>> = A | $Union<B>
export type $Union<T> = $_Union<*, *, T>

export class Kind<T: $List<any, any>> {}

class $_Higher<T, K: Kind<T>> {}
export class $Higher<K: Kind<any>> extends $_Higher<*, K> {}

/**
 * wrap :: Class (Kind t) -> $Higher (Kind t)
 */
export function wrap<T: $List<any, any>, HK: Kind<T>>(higherKind: Class<HK>, values: T): $Higher<HK> {
	return ((values: any): $Higher<HK>);
}

/**
 * unwrap :: Class (Kind t) -> $Higher (Kind t) -> t
 */
export function unwrap<T, HK: Kind<T>>(higherKind: Class<HK>, hkt: $Higher<HK>): T {
	return ((hkt: any): T);
}
