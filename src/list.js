// @flow

export class End {
	static h: empty
	static t: empty
}
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

type $_Head<H, L: $List<H, any>> = H
export type $Head<L> = $_Head<*, L>

type $_Tail<T, L: $List<any, T>> = T
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

class TypeConstructor<K, T: $Types<any, any>> {
	kind: K
	types: T
}

type $CtorKind<T> = $PropertyType<T, 'kind'>
type $CtorTypes<T> = $PropertyType<T, 'types'>

export class Type<Ctor: TypeConstructor<any, any>, TypeSignature: $CtorTypes<Ctor>, DataType> {

	static _wrap(data: DataType): Type<Ctor, TypeSignature, DataType> {
		return ((data: any): Type<Ctor, TypeSignature, DataType>);
	}

	static _unwrap(wrapped: Type<Ctor, TypeSignature, DataType>): DataType {
		return ((wrapped: any): DataType);
	}

}

class MaybeK {}

type MaybeCtor = TypeConstructor<MaybeK, $1Type<any>>

type MaybeData<T> =
	| { tag: 'Just', value: $A<T> }
	| { tag: 'Nothing' }

type MaybeT<T> = Type<MaybeCtor, T, MaybeData<T>>

class Maybe<T: $1Type<any>> extends Type<MaybeCtor, T, MaybeData<T>> {

	static Just<T: *>(a: $A<T>): MaybeT<T> {
		return Maybe._wrap({ tag: 'Just', value: a });
	}

	static Nothing<T: *>(): MaybeT<T> {
		return Maybe._wrap({ tag: 'Nothing' });
	}

	static map<A: *, B: *>(f: (a: A) => B, ma: MaybeT<A>): MaybeT<B> {
		let data = Maybe._unwrap(ma);
		switch (data.tag) {
			case 'Just':
				return Maybe.Just(f(data.value));

			case 'Nothing':
				return Maybe.Nothing();

			default:
				(data.tag: empty);
				throw new TypeError();
		}
	}

}

(Maybe: Functor<MaybeCtor, *>);

interface Functor<K, T> {
	map<A: $A<T>, B: *>(f: (a: A) => B, fa: Type<K, T, *>): Type<K, $SwapA<T, B>, *>
}
