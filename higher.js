// @flow

/**
 * defining type signatures
 */

export class end {}

type $End = Class<end>

export type $Sig<Head, Tail: $Sig<> | $End> = [Head, Tail]

export type $Sig1<A> = $Sig<A, $End>
export type $Sig2<A, B> = $Sig<A, $Sig<B, $End>>
export type $Sig3<A, B, C> = $Sig<A, $Sig<B, $Sig<C, $End>>>
export type $Sig4<A, B, C, D> = $Sig<A, $Sig<B, $Sig<C, $Sig<D, $End>>>>
export type $Sig5<A, B, C, D, E> = $Sig<A, $Sig<B, $Sig<C, $Sig<D, $Sig<E, $End>>>>>
export type $Sig6<A, B, C, D, E, F> = $Sig<A, $Sig<B, $Sig<C, $Sig<D, $Sig<E, $Sig<F, $End>>>>>>

/**
 * extracting types from signatures
 */

type $_Head<T, S: $Sig<T, any>> = T
export type $Head<S> = $_Head<*, S>

type $_Tail<T, S: $Sig<any, T>> = T
export type $Tail<S> = $_Tail<*, S>

export type $T1<T> = $Head<T>
export type $T2<T> = $Head<$Tail<T>>
export type $T3<T> = $Head<$Tail<$Tail<T>>>
export type $T4<T> = $Head<$Tail<$Tail<$Tail<T>>>>
export type $T5<T> = $Head<$Tail<$Tail<$Tail<$Tail<T>>>>>
export type $T6<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>

/**
 * transforming signatures
 */

type $_Union<A, B, T: $Sig<A, B>> = A | $Union<B>
export type $Union<T> = $_Union<*, *, T>

type $_SwapHead<OldHead, NewHead, Tail, Sig: $Sig<OldHead, Tail>> = $Sig<NewHead, Tail>
export type $SwapHead<S, A, B> = $_SwapHead<A, B, *, S>
