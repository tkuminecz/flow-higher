// @flow

export class End {
	static val: empty
}
export type $End = Class<End>

export type $List<A, B: $End | $List<any, any>> = {
	value: A,
	rest: B
}

export type $Head<T> = $PropertyType<T, 'value'>
export type $Tail<T> = $PropertyType<T, 'rest'>

export type $T1<T> = $Head<T>
export type $T2<T> = $Head<$Tail<T>>
export type $T3<T> = $Head<$Tail<$Tail<T>>>
export type $T4<T> = $Head<$Tail<$Tail<$Tail<T>>>>
export type $T5<T> = $Head<$Tail<$Tail<$Tail<$Tail<T>>>>>
export type $T6<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>
export type $T7<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>>
export type $T8<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>>>

type $_Union<A, B, T: $List<A, B>> = A | $_Union<*, *, B>
export type $Union<T> = $_Union<*, *, T>

export type $Tup1<A> = $List<A, $End>
export type $Tup2<A, B> = $List<A, $Tup1<B>>
export type $Tup3<A, B, C> = $List<A, $Tup2<B, C>>
export type $Tup4<A, B, C, D> = $List<A, $Tup3<B, C, D>>
export type $Tup5<A, B, C, D, E> = $List<A, $Tup4<B, C, D, E>>
export type $Tup6<A, B, C, D, E, F> = $List<A, $Tup5<B, C, D, E, F>>
export type $Tup7<A, B, C, D, E, F, G> = $List<A, $Tup6<B, C, D, E, F, G>>
export type $Tup8<A, B, C, D, E, F, G, H> = $List<A, $Tup7<B, C, D, E, F, G, H>>

export const t1 = <A>(a: A): $Tup1<A> => ({ value: a, rest: End });
export const t2 = <A, B>(a: A, b: B): $Tup2<A, B> => ({ value: a, rest: t1(b) });
export const t3 = <A, B, C>(a: A, b: B, c: C): $Tup3<A, B, C> => ({ value: a, rest: t2(b, c) });
export const t4 = <A, B, C, D>(a: A, b: B, c: C, d: D): $Tup4<A, B, C, D> => ({ value: a, rest: t3(b, c, d) });
export const t5 = <A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): $Tup5<A, B, C, D, E> => ({ value: a, rest: t4(b, c, d, e) });
export const t6 = <A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): $Tup6<A, B, C, D, E, F> => ({ value: a, rest: t5(b, c, d, e, f) });
export const t7 = <A, B, C, D, E, F, G>(a: A, b: B, c: C, d: D, e: E, f: F, g: G): $Tup7<A, B, C, D, E, F, G> => ({ value: a, rest: t6(b, c, d, e, f, g) });
export const t8 = <A, B, C, D, E, F, G, H>(a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H): $Tup8<A, B, C, D, E, F, G, H> => ({ value: a, rest: t7(b, c, d, e, f, g, h) });

export class Kind<K, T> {

	value: T

	constructor(kind: Class<K>, value: T) {
		this.value = value;
	}

	/**
	 * wrap :: Class k -> t -> Kind k t
	 */
	static wrap<K, I, T>(kind: Class<K>, value: T): Kind<K, T> {
		return new Kind(kind, value);
	}

	/**
	 * unwrap :: Kind k t ~> t
	 */
	static unwrap<K, T>(kind: Class<K>, value: Kind<K, T>): T {
		return value.value;
	}

}

type Maybe<T: $List<any, any>> =
	| { tag: 'Just', value: $T1<T> }
	| { tag: 'Nothing' }

let ma: Maybe<$Tup1<number>> = { tag: 'Just', value: 42 };


type Either<T: $List<any, any>> =
	| { tag: 'Left', value: $T1<T> }
	| { tag: 'Right', value: $T2<T> }

let ea: Either<$Tup2<number, string>> = { tag: 'Left', value: 42 };
