// @flow

export class End {}
export type $End = Class<End>

export type $List<H, T: $End | $List<any, any>> = [H, T]

export type $Types<H, T: $End | $Types<any, any>> = $List<H, T>

// lists of n types
export type $ListOf1<A> = $List<A, $End>
export type $ListOf2<A, B> = $List<A, $ListOf1<B>>
export type $ListOf3<A, B, C> = $List<A, $ListOf2<B, C>>
export type $ListOf4<A, B, C, D> = $List<A, $ListOf3<B, C, D>>

export type $1Type<A> = $ListOf1<A>
export type $2Types<A, B> = $ListOf2<A, B>
export type $3Types<A, B, C> = $ListOf3<A, B, C>
export type $4Types<A, B, C, D> = $ListOf4<A, B, C, D>

export type $Empty=  $1Type<empty>

type $_Head<H, L: $List<H, any>> = H // eslint-disable-line no-unused-vars
export type $Head<L> = $_Head<*, L>

type $_Tail<T, L: $List<any, T>> = T // eslint-disable-line no-unused-vars
export type $Tail<L> = $_Tail<*, L>

// access the nth type in a list
export type $1<L> = $Head<L>
export type $2<L> = $Head<$Tail<L>>
export type $3<L> = $Head<$Tail<$Tail<L>>>
export type $4<L> = $Head<$Tail<$Tail<$Tail<L>>>>

export type $A<L> = $1<L>
export type $B<L> = $2<L>
export type $C<L> = $3<L>
export type $D<L> = $4<L>

// swap types in the nth position of a list
export type $SwapA<T, A2> = $List<A2, $Tail<T>>
export type $SwapB<T, B2> = $List<$A<T>, $List<B2, $Tail<$Tail<T>>>>
export type $SwapC<T, C2> = $List<$A<T>, $List<$B<T>, $List<C2, $Tail<$Tail<$Tail<T>>>>>>
export type $SwapD<T, D2> = $List<$A<T>, $List<$B<T>, $List<$C<T>, $List<D2, $Tail<$Tail<$Tail<$Tail<T>>>>>>>>

type $_Union<A, B, L: $List<A, B>> = A | $Union<B> // eslint-disable-line no-unused-vars
export type $Union<L> = $_Union<*, *, L>

export type $Tag<Label, Data> = { tag: Label, value: $TupleMap<Data, <V>(v: V) => V> }

export class Type<Kind, Types, Data: $Tag<any, any>> {

	static wrap<I: Type<Kind, Types, Data>>(kind: Class<Kind>, data: Data): I {
		return ((data: any): I);
	}

	static unwrap<I: Type<Kind, Types, Data>>(kind: Class<Kind>, wrapped: I): Data {
		return ((wrapped: any): Data);
	}

}
