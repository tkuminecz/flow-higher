// @flow
import type { Cons, List } from 'flow-type-list';

/**
 * `Higher` type
 */
class _Higher<Kind, TypeSig: List<any, any>> {} // eslint-disable-line no-unused-vars
export type Higher<K, T> = _Higher<K, T>

/**
 * `HigherType` class
 */
export class HigherType< Kind, TypeSig: List<any, any>, InnerValue> {

	/**
	 * `inj`
	 *
	 * :: (Class K, V) -> Higher K T
	 */
	static inj(kind: Class<Kind>, value: InnerValue): Higher<Kind, TypeSig> {
		return ((value: any): Higher<Kind, TypeSig>);
	}

	/**
	 * `prj`
	 *
	 * :: (Class Kind, Higher K) -> InnerValue
	 */
	static prj(kind: Class<Kind>, higher: Higher<Kind, TypeSig>): InnerValue {
		return ((higher: any): InnerValue);
	}

}

// `App` - represents type application
export type App<K, T> = Higher<K, T>

// convenience types for applications of varying arities
export type App1<K, A> = App<K, Cons<A, *>>
export type App2<K, A, B> = App<K, Cons<A, Cons<B, *>>>
export type App3<K, A, B, C> = App<K, Cons<A, Cons<B, Cons<C, *>>>>
export type App4<K, A, B, C, D> = App<K, Cons<A, Cons<B, Cons<C, Cons<D, *>>>>>
export type App5<K, A, B, C, D, E> = App<K, Cons<A, Cons<B, Cons<C, Cons<D, Cons<E, *>>>>>>
export type App6<K, A, B, C, D, E, F> = App<K, Cons<A, Cons<B, Cons<C, Cons<D, Cons<E, Cons<F, *>>>>>>>
