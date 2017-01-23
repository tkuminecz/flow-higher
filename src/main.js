// @flow

export class End {
	static val: empty
}
export type $End = Class<End>

export type $TList<A, B: $End | $TList<any, any>> = {
	value: A,
	rest: B
}

export type $Head<T: $TList<any, any>> = $PropertyType<T, 'value'>
export type $Tail<T: $TList<any, any>> = $PropertyType<T, 'rest'>

export type $T1<T> = $Head<T>
export type $T2<T> = $Head<$Tail<T>>
export type $T3<T> = $Head<$Tail<$Tail<T>>>
export type $T4<T> = $Head<$Tail<$Tail<$Tail<T>>>>
export type $T5<T> = $Head<$Tail<$Tail<$Tail<$Tail<T>>>>>
export type $T6<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>
export type $T7<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>>
export type $T8<T> = $Head<$Tail<$Tail<$Tail<$Tail<$Tail<$Tail<$Tail<T>>>>>>>>

type $_Union<A, B, T: $TList<A, B>> = A | $_Union<*, *, B>
export type $Union<T> = $_Union<*, *, T>

export type $1Type<A> = $TList<A, $End>
export type $2Types<A, B> = $TList<A, $1Type<B>>
export type $3Types<A, B, C> = $TList<A, $2Types<B, C>>
export type $4Types<A, B, C, D> = $TList<A, $3Types<B, C, D>>
export type $5Types<A, B, C, D, E> = $TList<A, $4Types<B, C, D, E>>
export type $6Types<A, B, C, D, E, F> = $TList<A, $5Types<B, C, D, E, F>>
export type $7Types<A, B, C, D, E, F, G> = $TList<A, $6Types<B, C, D, E, F, G>>
export type $8Types<A, B, C, D, E, F, G, H> = $TList<A, $7Types<B, C, D, E, F, G, H>>

export const t1 = <A>(a: A): $1Type<A> => ({ value: a, rest: End });
export const t2 = <A, B>(a: A, b: B): $2Types<A, B> => ({ value: a, rest: t1(b) });
export const t3 = <A, B, C>(a: A, b: B, c: C): $3Types<A, B, C> => ({ value: a, rest: t2(b, c) });
export const t4 = <A, B, C, D>(a: A, b: B, c: C, d: D): $4Types<A, B, C, D> => ({ value: a, rest: t3(b, c, d) });
export const t5 = <A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): $5Types<A, B, C, D, E> => ({ value: a, rest: t4(b, c, d, e) });
export const t6 = <A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): $6Types<A, B, C, D, E, F> => ({ value: a, rest: t5(b, c, d, e, f) });
export const t7 = <A, B, C, D, E, F, G>(a: A, b: B, c: C, d: D, e: E, f: F, g: G): $7Types<A, B, C, D, E, F, G> => ({ value: a, rest: t6(b, c, d, e, f, g) });
export const t8 = <A, B, C, D, E, F, G, H>(a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H): $8Types<A, B, C, D, E, F, G, H> => ({ value: a, rest: t7(b, c, d, e, f, g, h) });

export const fromT1 = <A>(t: $1Type<A>): A => t.value;
export const fromT2 = <A, B>(t: $2Types<A, B>): [A, B] => [ t.value, t.rest.value ];
export const fromT3 = <A, B, C>(t: $3Types<A, B, C>): [A, B, C] => [ t.value, t.rest.value, t.rest.rest.value ];
export const fromT4 = <A, B, C, D>(t: $4Types<A, B, C, D>): [A, B, C, D] => [ t.value, t.rest.value, t.rest.rest.value, t.rest.rest.rest.value ];
export const fromT5 = <A, B, C, D, E>(t: $5Types<A, B, C, D, E>): [A, B, C, D, E] => [ t.value, t.rest.value, t.rest.rest.value, t.rest.rest.rest.value, t.rest.rest.rest.rest.value ];
export const fromT6 = <A, B, C, D, E, F>(t: $6Types<A, B, C, D, E, F>): [A, B, C, D, E, F] => [ t.value, t.rest.value, t.rest.rest.value, t.rest.rest.rest.value, t.rest.rest.rest.rest.value, t.rest.rest.rest.rest.rest.value ];
export const fromT7 = <A, B, C, D, E, F, G>(t: $7Types<A, B, C, D, E, F, G>): [A, B, C, D, E, F, G] => [ t.value, t.rest.value, t.rest.rest.value, t.rest.rest.rest.value, t.rest.rest.rest.rest.value, t.rest.rest.rest.rest.rest.value, t.rest.rest.rest.rest.rest.rest.value ];
export const fromT8 = <A, B, C, D, E, F, G, H>(t: $8Types<A, B, C, D, E, F, G, H>): [A, B, C, D, E, F, G, H] => [ t.value, t.rest.value, t.rest.rest.value, t.rest.rest.rest.value, t.rest.rest.rest.rest.value, t.rest.rest.rest.rest.rest.value, t.rest.rest.rest.rest.rest.rest.value, t.rest.rest.rest.rest.rest.rest.rest.value ];

export class HKT<K, T: $TList<any, any>> {

	/**
	 * wrap :: Class k -> t -> HKT k t
	 */
	static wrap<K, I, T: $TList<any, any>>(kind: Class<K>, value: T): HKT<K, T> {
		return ((value: any): HKT<K, T>);
	}

	/**
	 * unwrap :: HKT k t ~> t
	 */
	static unwrap<K, T: $TList<any, any>>(kind: Class<K>, value: HKT<K, T>): T {
		return ((value: any): T);
	}

}
