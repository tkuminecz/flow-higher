// @flow
import type { Cons } from 'flow-type-list';

/**
 * `Kind` class
 */
class Kind {
	kindName: string
}

/**
 * kind :: string -> Class Kind
 */
export const kind = (name: string): Class<Kind> => class extends Kind {
	kindName = name
};

/**
 * `TypeDef` class
 */
export class TypeDef<K: Kind, T, V> {

	/**
	 * inj :: (Kind k) => (Class k, v) -> App k t
	 */
	static inj(kind: Class<K>, value: V): App<K, T> {
		return ((value: any): App<K, T>);
	}

	/**
	 * prj :: (Kind k) => (Class k, App k t) -> v
	 */
	static prj(kind: Class<K>, app: App<K, T>): V {
		return ((app: any): V);
	}

}

// `App` - represents type application
export type App<K, T> = $Subtype<TypeDef<K, T, *>>

// convenience types for applications of varying arities
export type App1<K, A> = App<K, Cons<A, *>>
export type App2<K, A, B> = App<K, Cons<A, Cons<B, *>>>
export type App3<K, A, B, C> = App<K, Cons<A, Cons<B, Cons<C, *>>>>
export type App4<K, A, B, C, D> = App<K, Cons<A, Cons<B, Cons<C, Cons<D, *>>>>>
export type App5<K, A, B, C, D, E> = App<K, Cons<A, Cons<B, Cons<C, Cons<D, Cons<E, *>>>>>>
export type App6<K, A, B, C, D, E, F> = App<K, Cons<A, Cons<B, Cons<C, Cons<D, Cons<E, Cons<F, *>>>>>>>
